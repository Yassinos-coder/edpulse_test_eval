import './MainPage.css';
import React, { useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import photo1 from '../../assets/images/photo1.jpg';
import photo2 from '../../assets/images/photo2.jpg';
import photo3 from '../../assets/images/photo3.jpg';
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import FormModal from '../../utils/FormModel';
import axios from 'axios';

function MainPage() {
    const [newForm, setNewForm] = useState(new FormModal());
    const [submitResponse, setSubmitResponse] = useState('unknown');
    const [isChecked, setIsChecked] = useState(false);

    const signupFormRef = useRef(null);
    const aboutUsSectionRef = useRef(null);

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

    const scrollToRef = (ref) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth'
            });
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
            Object.values(newForm).every(value => value.trim() !== '') &&
            isChecked
        );
    };

    return (
        <div id='container'>
            <header id='pageHeader'>
                <div id='pageHeaderPartOne'><p>EduHost</p></div>
                <div id='pageHeaderPartTwo'>
                    <button onClick={() => scrollToRef(signupFormRef)}>Signup Form</button>
                    <button onClick={() => scrollToRef(aboutUsSectionRef)}>Who's EduHost?</button>
                </div>
            </header>
            <div id="quoteContainer">
                <p id="quote">Education is no longer confined to classrooms. E-learning opens the door to knowledge anytime, anywhere.
                    With <strong>EduHost</strong>, learning has never been easier.</p>
            </div>
            <div id="bodyContainer">
                <div id="cards">
                    {[photo1, photo2, photo3].map((photo, index) => (
                        <Card key={index} style={{ width: '25rem', backgroundColor: '#98D8EF', borderRadius: '15px' }}>
                            <Card.Img variant="top" src={photo} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '15px 15px 0 0' }} />
                            <Card.Body>
                                <Card.Title style={{ marginTop: '15px', textAlign: 'center' }}>
                                    {index === 0 ? "Learn Anytime, Anywhere!" : index === 1 ? "Engaging & Interactive!" : "Boost Your Skills Today!"}
                                </Card.Title>
                                <Card.Text style={{ paddingLeft: '10px' }}>
                                    {index === 0 ? "Access quality education at your convenience with interactive courses and flexible schedules."
                                        : index === 1 ? "Experience learning with videos, quizzes, and hands-on activities tailored for you."
                                            : "Take your knowledge to the next level with expert-led courses and real-world applications."}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <hr className='hrDivider' />
                <div id="signupForm" ref={signupFormRef}>
                    <div id='formContainer'>
                        <h1>Education is one click away</h1>
                        {submitResponse === 'success' && <p id='formSubmittionSuccess'>Form submitted successfully</p>}
                        {submitResponse === 'failed' && <p id='formSubmittionFailed'>Form submission failed</p>}
                        <div id="partOne">
                            <input className="inputs" type="text" placeholder="Prénom" required onChange={(e) => setNewForm({ ...newForm, firstname: e.target.value })} />
                            <input className="inputs" type="text" placeholder="Nom" required onChange={(e) => setNewForm({ ...newForm, lastname: e.target.value })} />
                        </div>
                        <input className="inputs blockInputs" type="email" placeholder="E-mail" required onChange={(e) => setNewForm({ ...newForm, email: e.target.value })} />
                        <input className="inputs blockInputs" type="tel" placeholder="Numéro de téléphone" required onChange={(e) => setNewForm({ ...newForm, phonenumber: e.target.value })} />
                        <input className="inputs blockInputs" type="text" placeholder="Adresse" required onChange={(e) => setNewForm({ ...newForm, adresse: e.target.value })} />
                        <label>
                            <input type="checkbox" required onChange={(e) => setIsChecked(e.target.checked)} />
                            I accept <a href="/terms">terms & conditions</a>, user data storing, and processing.
                        </label>
                        <button id='submitBtn' onClick={SendFormData} disabled={!isFormValid()} style={!isFormValid ? { backgroundColor: 'grey' } : {}}>Submit Form</button>
                    </div>
                </div>
                <hr className='hrDivider' />
                <div id="aboutUsSection" ref={aboutUsSectionRef}>
                    <div id='intro'>
                        <h1>EduHost </h1>
                        <p style={{textAlign:'center'}}> At EduHost, we redefine online learning by offering top-tier English courses designed by expert linguists and tailored to all proficiency levels.
                            <br />Whether you’re a beginner or an advanced learner, our interactive training  helps you improve your listening, speaking, reading, and writing skills, all while benefiting from personalized guidance.</p>
                        <h1> Follow Us!</h1>
                        <div id='socials'>
                            <FaLinkedin size="40" className='fa' style={{ color: '#0077B5' }} />
                            <FaInstagram size="40" className='fa' style={{ color: '#E1306C' }} />
                            <FaSquareXTwitter size="40" className='fa' style={{ color: '#1DA1F2' }} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
