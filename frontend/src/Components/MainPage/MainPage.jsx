import './MainPage.css';
import React, { useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import photo1 from '../../assets/images/photo1.jpg';
import photo2 from '../../assets/images/photo2.jpg';
import photo3 from '../../assets/images/photo3.jpg';
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import FormModal from '../../utils/FormModel';
import axios from 'axios'


function MainPage() {
    const [newForm, setNewForm] = useState(new FormModal())
    const [submitResponse, setSubmitResponse] = useState('unknown')
    // Create refs for each section
    const signupFormRef = useRef(null);
    const aboutUsSectionRef = useRef(null);

    // I used the beforeunload which will prevent the user from leaving the page if he only filled the form halfwayl
    //  also while the dialog is showing, I'm saving the user'S entries to the googlesheet through pabbly, PABBLY IS AWESOME BY THE WAY, LOVED IT,
    //  either I get the job or not am definelty gonna keep using it(PABBLY)
    
    useEffect(() => {
        const sendFormDataUncomplete = (event) => {
            // Check if at least one field is filled
            const isAnyFieldFilled = Object.values(newForm).some(value => value !== '');

            // Check if at least one field is empty, indicating incompleteness
            const isFormIncomplete = Object.values(newForm).some(value => value === '');

            if (isAnyFieldFilled && isFormIncomplete) {
                axios.post('http://172.232.54.120/SaveUncompletedFormData', newForm);
                event.preventDefault(); // Prevents the default behavior
                event.returnValue = ''; // Triggers the dialog in some browsers
            }
        };

        window.addEventListener('beforeunload', sendFormDataUncomplete);

        return () => {
            window.removeEventListener('beforeunload', sendFormDataUncomplete);
        };
    }, [newForm]);


    // Function to scroll to a specific ref
    const scrollToRef = (ref) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Function to trigger and send form data to backend to then be sent to pabby
    const SendFormData = async () => {
        try {
            axios.post('http://172.232.54.120/trigger-pabbly', newForm).then((res) => {
                switch (res.data.response.status) {
                    case 'success':
                        setSubmitResponse('success')

                        break;
                    case 'failed':
                        setSubmitResponse('failed')
                        break;
                    default:
                        break;
                }
                setTimeout(() => {
                    setSubmitResponse('unknown');
                }, 1000);
            })
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    return (
        <div id='container'>
            <header id='pageHeader'>
                <div id='pageHeaderPartOne'>
                    <p>EduHost</p>
                </div>
                <div id='pageHeaderPartTwo'>
                    <button onClick={() => scrollToRef(signupFormRef)}>Signup Form</button>
                    <button onClick={() => scrollToRef(aboutUsSectionRef)}>Who's EduHost ?</button>
                </div>
            </header>
            <div id="quoteContainer">
                <p id="quote">Education is no longer confined to classrooms e-learning opens the door to knowledge anytime, anywhere.
                    And with <strong>EduHost</strong> learning has never been easier.</p>
            </div>
            {/* Section 1 */}
            <div id="bodyContainer">
                <div id="cards">
                    <Card style={{ width: '25rem', backgroundColor: '#98D8EF', borderRadius: '15px' }} >
                        <Card.Img
                            variant="top" src={photo1}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                        />
                        <Card.Body>
                            <Card.Title style={{ marginTop: '15px', textAlign: 'center' }}>Learn Anytime, Anywhere! </Card.Title>
                            <Card.Text style={{ paddingLeft: '10px' }}>
                                Access quality education at your convenience with interactive courses and flexible schedules.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* Card 2 */}
                    <Card style={{ width: '25rem', backgroundColor: '#98D8EF', borderRadius: '15px' }} >
                        <Card.Img
                            variant="top" src={photo2}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', }}
                        />
                        <Card.Body>
                            <Card.Title style={{ marginTop: '15px', textAlign: 'center' }}>Engaging & Interactive!</Card.Title>
                            <Card.Text style={{ paddingLeft: '10px' }}>
                                Experience learning with videos, quizzes, and hands-on activities tailored for you.
                                Our platform is the one for you!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* Card 3  */}
                    <Card style={{ width: '25rem', backgroundColor: '#98D8EF', borderRadius: '15px' }} >
                        <Card.Img
                            variant="top" src={photo3}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                        />
                        <Card.Body>
                            <Card.Title style={{ marginTop: '15px', textAlign: 'center' }}>Boost Your Skills Today!</Card.Title>
                            <Card.Text style={{ paddingLeft: '10px' }}>
                                Take your knowledge to the next level with expert-led courses and real-world applications.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <hr className='hrDivider' /> {/* Divider between Section 1 and Section 2 */}
                {/* Section 2 */}
                <div id="signupForm" ref={signupFormRef}>
                    <div id='formContainer'>
                        <h1> Education is one click away</h1>
                        {submitResponse === 'success' && (
                            <p id='formSubmittionSucces'>Form submitted successfully</p>
                        )}

                        {submitResponse === 'failure' && (
                            <p id='formSubmittionfailed'>Form submission failed</p>
                        )}
                        <div id="partOne">
                            <input className="inputs" type="text" id="firstname" name="firstname" placeholder="Prénom"
                                autoComplete="given-name" required onChange={(e) => { setNewForm({ ...newForm, firstname: e.target.value }) }} />
                            <input className="inputs" type="text" id="lastname" name="lastname" placeholder="Nom"
                                autoComplete="family-name" required onChange={(e) => { setNewForm({ ...newForm, lastname: e.target.value }) }} />
                        </div>

                        <input className="inputs blockInputs" type="email" id="email" name="email" placeholder="E-mail"
                            autoComplete="email" required onChange={(e) => { setNewForm({ ...newForm, email: e.target.value }) }} />

                        <input className="inputs blockInputs" type="tel" id="phonenumber" name="phonenumber" placeholder="Numéro de téléphone"
                            autoComplete="tel" inputMode="tel" pattern="^\+\d{1,15}$" required onChange={(e) => { setNewForm({ ...newForm, phonenumber: e.target.value }) }} />

                        <input className="inputs blockInputs" type="text" id="adresse" name="adresse" placeholder="Adresse"
                            autoComplete="street-address" required onChange={(e) => { setNewForm({ ...newForm, adresse: e.target.value }) }} />

                        <label htmlFor="terms">
                            <input id="terms" name="terms" type="checkbox" required />
                            I accept <a href="/terms">terms & conditions</a>, user data storing, and processing.
                        </label>
                        <button id='submitBtn' onClick={() => SendFormData()}>Submit Form</button>
                    </div>
                </div>
                <hr className='hrDivider' /> {/* Divider between Section 3 */}
                {/* Section 3 */}
                <div id="aboutUsSection" ref={aboutUsSectionRef}>
                    <div id='intro'>
                        <div id='titleParagraph'>
                            <h1>EduHost</h1>
                        </div>
                        <div id='introParagraph'>
                            <p>
                                At EduHost, we don’t just provide online education—we redefine it. As a tier-one e-learning platform, we excel in delivering cutting-edge courses, expert-led training, and an unparalleled learning experience tailored for students, professionals, and educators alike. Our commitment to quality, innovation, and accessibility ensures that every learner gains real-world knowledge and skills that drive success. Whether you're upskilling for a career boost or diving into a new passion, EduHost is your gateway to limitless learning opportunities. 🚀
                            </p>
                            <h1>Follow Us!</h1>
                            <div id='socials'>
                                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin color="#0077B5" size="40" className='fa' />
                                </a>
                                <a href="https://www.instagram.com/the_1290srider/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram color="#E1306C" size="40" className='fa' />
                                </a>
                                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaSquareXTwitter color="#1DA1F2" size="40" className='fa' />
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MainPage;
