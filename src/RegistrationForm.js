import React from 'react';
import { useState } from 'react';

const initialFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    phoneType: '',
    staff: '',
    bio: '',
    signUpForEmails: false,
}

const initialErrors = {
    name: '',
    email: '',
    phoneNumber: '',
    phoneType: '',
    bio: '',
}

function RegistrationForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });

        if (Object.keys(errors).length > 0) {
            setErrors({
                ...errors,
                [name]: validateField(name, value),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setIsSubmitted(true);

        const newErrors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            phoneNumber: validatePhoneNumber(formData.phoneNumber),
            phoneType: validatePhoneType(formData.phoneNumber, formData.phoneType),
            bio: validateBio(formData.bio),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if(!hasErrors) {
            console.log('Form Data Submitted:', formData);
            setFormData(initialFormData);
            setErrors(initialErrors);
        }
    };

    const validateName = (name) => {
        if (!name.trim()) return 'Name is required.';
        return '';
    }

    const validateEmail = (email) => {
        if (!email) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Invalid email address.';
        return '';
    }

    const validatePhoneNumber = (phoneNumber) => {
        if (phoneNumber) {
          const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
          if (!phoneRegex.test(phoneNumber)) return 'Invalid phone number. Format: 123-456-7890';
        }
        return '';
    };
    
    const validatePhoneType = (phoneNumber, phoneType) => {
        if (phoneNumber && !phoneType) return 'Please select a phone type.';
        return '';
    };

    const validateBio = (bio) => {
        if (bio.length > 280) return 'Bio must be 280 characters or less.'
        return '';
    }

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return validateName(value);
            case 'email':
                return  validateEmail(value);
            case 'phoneNumber':
                return validatePhoneNumber(value);
            case 'phoneType':
                return validatePhoneType(formData.phoneNumber, value);
            case 'bio':
                return validateBio(value);
            default:
                return '';
        }
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type='text' name='name' value={formData.name} onChange={handleChange} />
                {isSubmitted && errors.name && <div className="error">{errors.name}</div>}
            </label>
            <br></br>
            <label>
                Email:
                <input type='email' name='email' value={formData.email} onChange={handleChange} />
                {isSubmitted && errors.email && <div className="error">{errors.email}</div>}
            </label>
            <br></br>
            <label>
                Phone Number:
                <input type='tel' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} placeholder="123-456-7890" />
                {isSubmitted && errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
            </label>
            <br></br>
            <label>
                Phone Type:
                <select name="phoneType" value={formData.phoneType} onChange={handleChange} disabled={!formData.phoneNumber}>
                    <option value="">--Please choose an option--</option>
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="mobile">Mobile</option>
                </select>
                {isSubmitted && errors.phoneType && <div className="error">{errors.phoneType}</div>}
            </label>
            <br></br>
            <label>
                Staff:
                <input type="radio" name="staff" value="instructor" checked={formData.staff === 'instructor'} onChange={handleChange} /> Instructor
                <input type="radio" name="staff" value="student" checked={formData.staff === 'student'} onChange={handleChange} /> Student
            </label>
            <br></br>
            <label>
                Bio:
                <textarea name="bio" value={formData.bio} onChange={handleChange} maxLength="280" />
                {isSubmitted && errors.bio && <div className="error">{errors.bio}</div>}
            </label>
            <br></br>
            <label>
                Sign up for email notifications:
                <input type="checkbox" name="signUpForEmails" checked={formData.signUpForEmails} onChange={handleChange} />
            </label>
            <br></br>
            <button type="submit">Submit</button>
        </form>
    )
}

export default RegistrationForm;