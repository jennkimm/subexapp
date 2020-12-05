import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../Config';

const { Title } = Typography;

function LandingPage() {
    const [Subjects, setSubjects] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/subject/`)
            .then(response => {
                if (response.data) {
                    setSubjects(response.data.data)
                } else {
                    alert('Failed to get Subjects')
                }
            })
    }, [])

    const renderCards = Subjects.map((subject, index) => {
        return ( 
            <Col key={index} lg={6} md={8} xs={24}>
                <span>과목명: {subject.subject_name} </span><br />
                <span>담당 교수: {subject.professor} </span><br />
                <hr />
            </Col>
        );
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />
            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage