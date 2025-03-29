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

    const [newForm, setNewForm] = useState(new FormModal());
    const [submitResponse, setSubmitResponse] = useState('unknown');

    useEffect(() => {
        const sendFormDataUncomplete = (event) => {
            const isAnyFieldFilled = Object.values(newForm).some(value => value !== '');
            const isFormIncomplete = Object.values(newForm).some(value => value === '');

            if (isAnyFieldFilled && isFormIncomplete) {
                axios.post('http://172.232.54.120/SaveUncompletedFormData', newForm);
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', sendFormDataUncomplete);
        return () => {
            window.removeEventListener('beforeunload', sendFormDataUncomplete);
        };
    }, [newForm]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const SendFormData = async () => {
        try {
            axios.post('http://172.232.54.120/trigger-pabbly', newForm).then((res) => {
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
                        <p>Improve your English kills with our <br />
                            online courses and experienced instructors.
                        </p>
                        <button onClick={() => scrollToSection('contactusForm')}>Get Started</button>
                    </div>
                    <div>
                        <img src={UkFlag} alt="United Kingdom Flag" id='ukFlag' />
                        <img src={personLearning} alt="" id='personLearning' />
                    </div>
                </div>
            </div>
            {/* Section 2 */}
            <div id="whychooseus">
                <h1 style={{ textAlign: 'center' }}>Why Choose Us?</h1>
                <AnimatedText text="Our instructors are highly qualified and experienced in teaching English." delay={200} />
                <div id='strongPoints'>
                    <div id='card'>
                        <MdStars color='#295c8a' size={80} />
                        <p id='cardTitle'>Expert Teachers</p>
                        <p>Our instructors are highly qualified and experienced in teaching english.</p>
                    </div>
                    <div id='card'>
                        <MdOutlineSmartDisplay color='#295c8a' size={80} />
                        <p id='cardTitle'>Expert Teachers</p>
                        <p>Engaging and interactive lessons to help you learn effectively.</p>
                    </div>
                    <div id='card'>
                        <MdCalendarMonth color='#295c8a' size={80} />
                        <p id='cardTitle'>Expert Teachers</p>
                        <p>Learn at your pace, with our flexible scheduling options.</p>
                    </div>
                </div>
            </div>
            {/* Section 3 */}
            <div id='contactusForm'>
                <h1 style={{ textAlign: 'center' }}>Explore Our Courses</h1>
                <p style={{ textAlign: 'center' }}>We offer a wide range of english courses, tailored for beginners, advanced and experts seeking to improve their english.
                    In of these categories? contact us through the form below and we'll reach it out to setup our account!
                </p>
                <div id='formContainer'>
                    {submitResponse === 'success' && <p id='formSubmittionSuccess'>Form submitted successfully</p>}
                    {submitResponse === 'failed' && <p id='formSubmittionFailed'>Form submission failed</p>}
                    <div id="partOne">
                        <input type="text" className="inputs" placeholder='Firstname' required onChange={(e) => setNewForm({ ...newForm, firstname: e.target.value })} />
                        <input type="text" className="inputs" placeholder='Lastname' required onChange={(e) => setNewForm({ ...newForm, lastname: e.target.value })} />

                    </div>
                    <input type="text" className="inputs blockInputs" placeholder='E-mail' required onChange={(e) => setNewForm({ ...newForm, email: e.target.value })} />
                    <input type="text" className="inputs blockInputs" placeholder='Phone number' required onChange={(e) => setNewForm({ ...newForm, phonenumber: e.target.value })} />
                    <button
                        id='submitBtn'
                        onClick={SendFormData}
                        disabled={!isFormValid()}
                        style={{ backgroundColor: isFormValid() ? "#2D89FF" : "grey", cursor: isFormValid() ? "pointer" : "not-allowed" }}
                    >
                        Submit form
                    </button>                </div>
            </div>
            {/* Section 4 */}
            <div id="footer">
                <h2 style={{ textAlign: 'center' }}>About Us | EduHost!</h2>
                <p style={{ width: '80%', textAlign: 'center' }}>
                    We are dedicated to helping learners improve their English skills with high-quality courses designed by expert instructors. Whether you're a beginner or an advanced learner, our platform provides engaging lessons, interactive exercises, and personalized learning experiences.</p>
                <h2>Follow Us!</h2>
                <div id='socials'>
                    <FaLinkedin size="40" className='fa' style={{ color: '#0077B5' }} />
                    <FaInstagram size="40" className='fa' style={{ color: '#E1306C' }} />
                    <FaSquareXTwitter size="40" className='fa' style={{ color: '#1DA1F2' }} />
                </div>
            </div>
        </div>
    )

}

export default LandingPage