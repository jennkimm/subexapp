import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../Config';

const { Title } = Typography;

function LandingPage() {
    const [Subjects, setSubjects] = useState([])
    const [Sugang, setSugang] = useState([])

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

    useEffect(() => {
        axios.get(`http://localhost:4000/sugang/get/test3`)
            .then(response => {
                if (response.data) {
                    setSugang(response.data)
                } else {
                    alert('Failed to get Sugang')
                }
            })
    }, [])

    // const renderCards_dropping = Sugang.map((sugang, index) => {
    //     return ( 
    //         <Col key={index} lg={6} md={8} xs={24}>
    //             <span>과목 아이디: {sugang.subject_id} </span><br />
    //             <span>유저아이디: {sugang.user_id} </span><br />
    //             <hr />
    //         </Col>
    //     );
    // })

    const renderCards_having = Sugang.map((sugang, index) => {
        return ( 
            <Col key={index} lg={6} md={8} xs={24}>
                <span>과목아이디: {sugang.subject_id} </span><br />
                <hr />
            </Col>
            );
        })
    }

    const renderCards_dropping = Sugang.map((sugang, index) => {
            if(Sugang.wanna_drop === true) {
                return (
                <Col key={index} lg={6} md={8} xs={24}>
                    <span>과목아이디: {sugang.subject_id} </span><br />
                    <hr />
                </Col>
            );
        }
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 내가 갖고있는 과목 </Title>
            <hr />
            <Row gutter={16}>
                {renderCards_having}
            </Row>
            <Title level={2} > 내가 버리고 싶은 과목 </Title>
            <hr />
            <Row gutter={16}>
                {renderCards_dropping}
            </Row>
        </div>
    )
}

export default LandingPage