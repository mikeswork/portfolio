import React from "react";
import styled from "styled-components";
import Section from "./Section";
import pageData from "../data/pageData.json";
import { snapPts } from "../util/mixins";

const Resume = styled.div`
    ${snapPts.maxLarge};
    margin: 0 auto;
    font-family: sans-serif;

    h3 { 
        text-transform: uppercase; 
        margin: 0.25em 2em 1em 2em; 
        text-align: center;

        @media (${snapPts.minMed}) {
            text-align: center;
        }
    }
    
    h4 { margin: 0.25em 0; }
    h5 { margin: 0.25em 0 0.5em; }

    ul { 
        margin: 0.25em 0.25em 1.25em;

        li {
            margin: 0.2em 0;
        } 
    }

    .chunk {
        display: grid;
        grid-template-columns: 100%;
        
        @media (${snapPts.minMed}) {
            grid-template-columns: 25% 75%;
        }
    }

    .chunk.skills {
        margin-bottom: 1.25em;
        @media (${snapPts.maxSmall}) {
            justify-items: center;
        }

        ul {
            display: grid;
            padding-left: 12px;
            grid-template-columns: auto auto auto;
            
            @media (${snapPts.maxSmall}) {
                grid-template-columns: auto auto;
            }

            li {
                margin-right: 30px;

                @media (${snapPts.maxSmall}) {
                    margin-left: 15px;
                    margin-right: 15px;
                }
            }
        }
    }
`

const ResumeContent = (props) => {
    const skills = pageData.pages.resume.content.skills || [];
    const jobs = pageData.pages.resume.content.experience || [];

    let skillId = 0;
    let jobId = 0;
    let respId = 0;
    
    return (
        <Resume>

            <div className="chunk skills">
                <h3>Skills and Abilities</h3>

                <ul>{ skills.map(skill => (<li key={skillId++}>{skill}</li>)) }</ul>
            </div>
            
            <div className="chunk work">
               <h3>Work Experience</h3>
                <div className="jobs">
            {
                jobs.map(job => (
                    <div key={jobId++}>
                        <h4>{job.title} <span className="job-years">({job.years})</span></h4>
                        <h5>{job.company}</h5>
                        <ul>
                        {
                            job.responsibilities.map(resp => (
                                <li key={respId++}>{resp}</li>
                            ))
                        }
                        </ul>
                    </div>
                ))
            }
            </div>
            </div>
        </Resume>
    )
}

const ResumeSection = (props) => {
    return (
        <Section path={pageData.pages.resume.path} title={pageData.pages.resume.title}>
            <ResumeContent/>
        </Section>
    )
}

export default ResumeSection;