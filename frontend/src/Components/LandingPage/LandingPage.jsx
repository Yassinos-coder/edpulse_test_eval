/* eslint-disable no-unused-vars */
import './LandingPage.css'
import React, { useEffect, useRef, useState } from 'react'
import UkFlag from '../../assets/images/photo5.jpg'
import personLearning from '../../assets/images/photo6.png'
import { MdStars, MdOutlineSmartDisplay, MdCalendarMonth } from "react-icons/md";
import axios from 'axios';
import FormModal from '../../utils/FormModel';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import StyledAlert from '../../utils/StyledAlert';
import AnimatedText from '../../utils/AnimatedText';

function LandingPage() {
    // State to manage form data and submission response
    const [newForm, setNewForm] = useState(new FormModal());
    const [submitResponse, setSubmitResponse] = useState('unknown');

    // Effect to send incomplete form data before the user leaves the page
    useEffect(() => {
        const sendFormDataUncomplete = (event) => {
            const isAnyFieldFilled = Object.values(newForm).some(value => value !== '');
            const isFormIncomplete = Object.values(newForm).some(value => value === '');

            if (isAnyFieldFilled && isFormIncomplete) {
                axios.post('https://api.yassinoscoder.com/SaveUncompletedFormData', newForm);
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', sendFormDataUncomplete);
        return () => {
            window.removeEventListener('beforeunload', sendFormDataUncomplete);
        };
    }, [newForm]);

    // Function to smoothly scroll to a section of the page
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Function to send form data to the backend API
    const SendFormData = async () => {
        try {
            axios.post('https://api.yassinoscoder.com/trigger-pabbly', newForm).then((res) => {
                switch (res.data.response.status) {
                    case 'success':
                        setSubmitResponse('success');
                        break;
                    case 'failed':
                        setSubmitResponse('failed');
                        break;
                    default:
                        break;
                }
                setTimeout(() => {
                    setSubmitResponse('unknown');
                }, 1000);
            });
        } catch (error) {
            console.error('Error', error.message);
        }
    };

    // Function to validate the form fields before submission
    const isFormValid = () => {
        return (
            newForm.firstname?.trim() !== '' &&
            newForm.lastname?.trim() !== '' &&
            newForm.email?.trim() !== '' &&
            newForm.phonenumber?.trim() !== ''
        );
    };

    return (
        <div id='mainContainer'>
            <StyledAlert status={submitResponse} />

            {/* Header Section */}
            <div id="headerContainer">
                <header id='header'>
                    <p>Learn English Online</p>
                    <nav>
                        <ul>
                            <li><button onClick={() => scrollToSection('mainContainer')}>Home</button></li>
                            <li><button onClick={() => scrollToSection('whychooseus')}>Why Choose Us?</button></li>
                            <li><button onClick={() => scrollToSection('contactusForm')}>Send Us a Message</button></li>
                            <li><button onClick={() => scrollToSection('footer')}>Socials</button></li>
                        </ul>
                    </nav>
                </header>
                <div id='headerContainerMiddle'>
                    <div id='headerContainerMiddle-leftSide'>
                        <p id='title'>Learn English Online</p>
                        <p>Improve your English skills with our online courses and experienced instructors.</p>
                        <button onClick={() => scrollToSection('contactusForm')}>Get Started</button>
                    </div>
                    <div>
                        <img src={UkFlag} alt="United Kingdom Flag" id='ukFlag' />
                        <img src={personLearning} alt="" id='personLearning' />
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div id="whychooseus">
                <h1 style={{ textAlign: 'center' }}>Why Choose Us?</h1>
                <AnimatedText text="Our instructors are highly qualified and experienced in teaching English." delay={200} />
                <div id='strongPoints'>
                    <div id='card'>
                        <MdStars color='#295c8a' size={80} />
                        <p id='cardTitle'>Expert Teachers</p>
                        <p>Our instructors are highly qualified and experienced in teaching English.</p>
                    </div>
                    <div id='card'>
                        <MdOutlineSmartDisplay color='#295c8a' size={80} />
                        <p id='cardTitle'>Interactive Lessons</p>
                        <p>Engaging and interactive lessons to help you learn effectively.</p>
                    </div>
                    <div id='card'>
                        <MdCalendarMonth color='#295c8a' size={80} />
                        <p id='cardTitle'>Flexible Schedule</p>
                        <p>Learn at your pace, with our flexible scheduling options.</p>
                    </div>
                </div>
            </div>

            {/* Contact Us Form Section */}
            <div id='contactusForm'>
                <h1 style={{ textAlign: 'center' }}>Explore Our Courses</h1>
                <p style={{ textAlign: 'center' }}>We offer a wide range of English courses for all levels. Fill out the form below to get started.</p>
                <div id='formContainer'>
                    {submitResponse === 'success' && <p id='formSubmittionSuccess'>Form submitted successfully</p>}
                    {submitResponse === 'failed' && <p id='formSubmittionFailed'>Form submission failed</p>}
                    <input type="text" className="inputs" placeholder="Firstname" required autoComplete="given-name" onChange={(e) => setNewForm({ ...newForm, firstname: e.target.value })} />
                    <input type="text" className="inputs" placeholder="Lastname" required autoComplete="family-name" onChange={(e) => setNewForm({ ...newForm, lastname: e.target.value })} />
                    <button id="submitBtn" onClick={SendFormData} disabled={!isFormValid()} style={{ backgroundColor: isFormValid() ? "#2D89FF" : "grey" }}>Submit form</button>
                </div>
            </div>

            {/* Footer Section */}
            <div id="footer">
                <h2 style={{ textAlign: 'center' }}>About Us | EduHost!</h2>
                <h2>Follow Us!</h2>
                <div id='socials'>
                    <FaLinkedin size="40" style={{ color: '#0077B5' }} />
                    <FaInstagram size="40" style={{ color: '#E1306C' }} />
                    <FaSquareXTwitter size="40" style={{ color: '#1DA1F2' }} />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
