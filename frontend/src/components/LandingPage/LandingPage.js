import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { Menu, Dropdown, Button } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../Config';
const { Title } = Typography;

// 로그인을 안했을 시에는, 로그인을 해야 이용이 가능하다고 표시
// 로그인을 했을 시에는, O
// 타임테이블 넘버대로 드롭다운. O
// 자신이 가지고 있는 과목들을 타임테이블 넘버에 맞게 보여줌 ( filter ) O
// 해당 과목을 클릭할 시에 "버릴지/삭제할지/수정" 선택 가능
// 수정 선택 시에는 모달 창 띄워서 수강 정보 수정 가능
// 버리는 과목 중, 매칭된 사람이 나타났다면, notification 뜸

function LandingPage() {
  const [Sugang, setSugang] = useState([]);
  const [TableNumber, setTableNumber] = useState(1);
  const [Ha, setHa] = useState([]);

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" onClick={() => setTableNumber(1)}>
          테이블1
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" onClick={() => setTableNumber(2)}>
          테이블2
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" onClick={() => setTableNumber(3)}>
          테이블3
        </a>
      </Menu.Item>
    </Menu>
  );

  async function delay(sugang) {
    await axios.get(`http://localhost:4000/subject/get/` + sugang.subject_id)
        .then((res) => {
          Sugang.push({
            sugang: sugang,
            professor: res.data.professor,
          })
          setSugang(Sugang);
          setHa(Sugang.map((sugang, index) => {
            return (
              <Col key={index} lg={6} md={8} xs={24}>
                <span id>과목명: {sugang.sugang.subject_name} </span>
                <br />
                <span>교수: {sugang.professor} </span>
                <hr />
              </Col>
            );
        }));
        });
  }

  async function test(arr) {
    for (const sugang of arr) {
        await delay(sugang);
    }
  }
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/sugang/get/` + localStorage.getItem('userId'))
      .then((response) => {
        if (response.data) {
            test(response.data);
        }
        else {
          alert('Failed to get Sugang Info');
        }
      });
  }, []);

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}>내가 갖고있는 과목</Title>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <Button>테이블 {TableNumber}</Button>
      </Dropdown>
      <hr />
      <Row gutter={16}>
          {Sugang.length === 0 ?
            <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
              <h2>No post yet...</h2>
            </div> :
            <div>
            <Row gutter={16}>
              {Ha}
            </Row>
            </div>
          }
      </Row>
      <Title level={2}>내가 버리고 싶은 과목 </Title>
      <hr />
      {/* <Row gutter={16}>{renderCards_dropping}</Row> */}
    </div>
  );
}

export default LandingPage;
