
import React from "react";
import { useParams } from "react-router-dom";
// styled => 자바스크립트 내에서 컴포넌트 스타일을 작성할 때 사용
// styles => css modules에서 정의된 클래스를 자바스크립트에서 가져와 사용할 때 사용
import styled from 'styled-components';
import styles from '../Detail.module.css';
import {useState, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';

/**
 * 24.01.10 
 * styled-component 문법 
 * **/ 

// let Box = styled.div`
//   padding: 20px;
//   color: grey;
// `;

let YellowBtn = styled.button`
  background: ${props => props.bg};
  color: black;
  padding: 10px;
`

let YellowBox = styled.div`
  width: 400px;
  height: 400px;
  background: yellow;
  padding: 20px;
`
function Detail({shoes}){
  // 알림창이 나왔다 들어가는 건 상태가 변경된다는 뜻이므로 useState로 스위치를 만들어야함
  let [alerts, setAlert] = useState(true);


  /**
   * useEffect(()=>{}, [])
   * 이 코드에서 [] 내부에는 변수나 state 같은 것들을
   * 넣을 수 있다. []에 있는 변수나 state 가 변할 때만
   * useEffect 안에 있는 코드를 실행해준다.
   * 
   * 아무것도 안 넣으면 컴포넌트 mount(로드 시) 
   * 1회 실행하고 영영 실행해주지 않는다.
   *
   * **/ 
  useEffect(()=>{
     // 여기 적은 코드는 컴포넌트 로드 & 업데이트 될때마다 실행됨
    /**
     * 또한 useEffect 안에 적은 코드는 html 렌더링 이후에 
     * 동작하므로 굉장히 길이가 긴 코드의 경우 조금이라도
     * html렌더링이 빠른 사이트를 원하면 쓸데없이 긴
     * 코드들은 useEffect 내부에 넣어서 쓰자.
     * 
     * 예를 들어
     * 1. 오래걸리는 반복 연산
     * 2. 서버에서 데이터 가져오는 작업 
     * 3. 타이머 다는 것 등등.
     * **/ 

    let timer = setTimeout(() => {
      setAlert(false)
      // YellowBoxRef.current.style.display = "none";
    }, 2000);

    /**
    1. useEffect(()=>{}, [])의 clean up function
    useEffect동작하기 전 특정 코드 실행하고 싶을 떼
    useEffect(()=>{
     return() => {
      여기 있는 코드가 먼저 실행됨
     }
    })

    (참고1) clean up function은 타이머제거, socket 연결요청제거, ajax요청 중단
    등등의 코드를 많이 작성한다. 
    (참고2) 컴포넌트 unmount 시에도 clean up function 안에 있던게 1회 실행된다.
    **/
    return() => {
      clearTimeout(timer)
    }
  }, []);

  let [count, setCount] = useState(0);
  /**
   * 24.01.09 useParams(); -> 
    유저가 URL파라미터에 입력한 값을 가져오고 싶을 때 사용한다.
    만약 유저가 전혀 상관없는 값을 입력해서 접속을 시도하면
    조건문으로 필터링을 걸어서 해당 파라미터값이 없을 때
    상품이 없다고 알려주기~
   * **/  
  let {id} = useParams();

  let [input, setInput] = useState('')
  
  useEffect(() => {
      if(isNaN(input) == true){
        alert('숫자를 입력하세요');
      }
  },[input]);

  function popUp (e) {
    setInput(e.target.value);
  }
  
  let [tab, setTab] = useState(0);


  /**
   * 24.01.10
   * 1. array.find()
   * - 조건을 만족하는 첫번째 요소를 찾을 시 해당 요소를 반환한다.
   * 따라서 조건 만족하는 요소가 하나만 필요할 때 사용
   * 2. array.filter()
   * - 조건을 만족하는 모든 요소를 찾아 **배열**로 반환한다.
   * 조건을 만족하는 모든 요소를 찾고 싶을 때 사용
   * 
   * 아래의 코드에서 filter를 사용할 경우, 결과값으로 
   * 배열을 반환하기 때문에 
   * let selectItem = shoe.filter((shoe) => shoe.id ==id)[0]
   * 와 같이 배열의 첫 번째 요소를 선택해주어야 한다.
   * **/ 
  let selectItem = shoes.find((shoe) => shoe.id == id)
  
  return(
    <div>
      <div className="container">
        
        {alerts == true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null}
        
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{selectItem.title}</h4>
            <p>{selectItem.content}</p>
            <p>{selectItem.price}</p>
            <button className="btn btn-danger">주문하기</button> 
            {/* <YellowBtn bg="orange">주문하기 오렌지</YellowBtn>
            <YellowBtn bg="blue">주문하기 파랑</YellowBtn> */}
          </div>
        </div>
     
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}/>


        {/* <div>내용0</div>
        <div>내용1</div>
        <div>내용2</div> */}
        {/* <button onClick={() => setCount(count+1)}>버튼</button> */}
        {/* <YellowBox onChange={displayNone}></YellowBox> */}
        {/* <input onChange={popUp}></input> */}
      </div> 
    </div>
  )
}

function TabContent({tab}){
  if(tab == 0){
    return <div>내용0</div>
  }
  if(tab == 1){
    return <div>내용1</div>
  }
  if(tab == 2){
    return <div>내용2</div>
  }
  
}

export default Detail;
