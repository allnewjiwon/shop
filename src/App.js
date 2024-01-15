
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import dataFirst from './dataFirst.js';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import About from './routes/About.js';
import axios from 'axios'; 


function App() {
  // let [shoes] = useState(dataFirst);

  let navigate = useNavigate();

  let [shoes, setShoes] = useState(dataFirst);

  let [count, setCount] = useState(0);
 
  // 만약 버튼을 짝수번으로 누르면 data3가져오기
  const fetchData = () => {
    axios.get('https://codingapple1.github.io/shop/data2.json')
      // 여기서 prd => data2.json에 있는 데이터를 받아온거임
      .then((prd)=>{
        let copy = [...shoes, ...prd.data] // 원래 있던 데이터에 새로운 데이터를 배열로 추가한거임
        setShoes(copy);
        console.log(copy);
      })
      .catch(()=>{
        // 요청 실패 시 처리할 로직
        console.log('가져오기 실패함;;');
      });
    /**
     * 24.01.15 
     * 1. post 요청하는 법
     * axios.post('URL', {name : 'kim'}) << 서버로 {name : 'kim'}가 바로 전송됨
     * 2. 동시에 AJAX 요청 여러개 날리기
     * Promise.all([axios.get('URL1'), axios.get('URL2)])
     * << URL1, URL2로 GET 요청을 동시에 해준다.
     * 두 전송 요청 모두 성공했을 때 
     * 
     * 
     * **/
  }

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"> <Link to="/">home</Link> </Nav.Link>
            <Nav.Link href="#features"><Link to="/detail">detail</Link></Nav.Link>
            <Nav.Link href="#pricing"><Link to="/about">about</Link></Nav.Link>
            <Nav.Link href="#pricing"><Link to="/event">event</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* 24.01.09 참고~
        컴포넌트 역할 : component 폴더
        페이지 역할 : routes 아님 pages 폴더
        자주 쓰는 함수 : utils 폴더

        Link 대신 useNavigate() 사용해도 됨.
        ex) return(
            <button onClick={()=>{navigate('/detail)}}>이동버튼</button>
        )
        navigate(2) 라고 숫자 넣으면 앞으로 2번 가기 가능 
        navigate(-1) 라고 숫자 넣으면 뒤로 1번 가기 가능
      */}
      
      
      <Routes>
          <Route path="/" element={
            <>
              <div className='main-bg'></div>
              <Container>
                <Shoes 
                  shoes={shoes}
                  />
                {/* <Product 
                products={products}
                /> */}
                <button onClick={()=>{
                  fetchData();
                  }}>상품데이터 추출~ㅋㅋ
                </button>
              </Container>
            </>
          }></Route>
          {/* 24.01.09 url 파라미터 문법을 사용하면 
          페이지를 100개든 1000개든 만들 수 있음~~~~ 
          ex) path='/detail/:id' << detail/아무거나~ 
          또한 파라미터는 여러개 사용가능하다 
          ex) path='/detail/:id/dkfja/:gkgk'

          접속하는 라우터마다 다른 페이지를 보여주려면
          1. 각각 다른 컴포넌트(페이지)를 100만개 만들던가
          2. 하나의 컴포넌트로 각각 다른 내용을 보여주던가*/}

         
          <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
          <Route path="/detail" element={<Shoes shoes={shoes}/>} />
          {/* <Route path="/detail/1" element={<Detail shoes={shoes}/>} />
          <Route path="/detail/2" element={<Detail shoes={shoes}/>} /> */}

          <Route path="/about" element={<About />}>
            {/* 아래와 같이 route 내부에 또 route를 넣을 수 있는데
            이걸 Nested routes 라고 한다. 그리고 Nested routes를 
            어디에 넣을지 Outlet으로 자리를 잡아준다. */}
            <Route path="member" element={<div>멤버들</div>} />
            <Route path="location" element={<div>회사위치</div>} />
          </Route>
          <Route path="/event" element={<Event />}>
            <Route path='one' element={<div>첫 주문 시 양배추즙 서비스</div>}></Route>
            <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
          </Route>
         
      </Routes>
      
      {/* 24.01.15 
        쌩자바스크립트로 데이터 받아오기 -> json에서 array/object로 변환해주는 작업이 필요.
        fetch('URL')
        .then(결과 => 결과.json())
        .then((결과) => {console.log()결과})
      */}

    </div>
  );
}
/****************************************************************************************** */
//컴포넌트

function Shoes({
  shoes,
}){
  return(
    <div>
        <Row>
          {shoes.map((shoe, i) => {
            return(
              <Col key={shoe.id} className="prd-list">
                <img className="prd-img" src={`https://codingapple1.github.io/shop/shoes${shoe.id + 1}.jpg`}></img>
                <h4>{ shoe.title }</h4>
                <p>{ shoe.price }</p>
              </Col>
            )
          })}
        </Row>
      
    </div>
  )
}

function Event(){
  return(
    <div>
      <h2>오늘의 이벤트</h2>
      <Outlet></Outlet>
    </div>
  )
}

// function Product({products}){
  
//   return(
//     <div>
//         {products.map((product, i)=>{
//           return(
//             <div key={product.id} className="prd-item">
//               <h3 className='title'>{products[i].title}</h3>
//               <span className='content'>{products[i].content}</span>
//               <span className='price'>{products[i].price}</span>
//             </div>
//           )
//         }
//         )}
//     </div>
//   )
// }
export default App;


/* 이미지 넣을 때 주의해야 될 것!! 
왜냐하면 리액트로 만든 페이지 배포 시 하위 경로에 배포하면 파일을 찾을 수 없다고
나올 수도 있기 때문에, /어쩌구/를 뜯하는 process.env.PUBLIC_URL을 
꼭꼭 더해주어야 한다.
ex) <img src={process.env.PUBLIC_URL + '/logo192.png'} /> 
*/


/**
 * 24.01.12
 * 서버 : 유저가 데이터 달라고 요청할 시 데이터를 보내주는 간단한 프로그램
 * 서버에 데이터 요청 시  
 * 1. 어떤 데이터인지 (URL 형식으로)
 * 2. 어떤 방법으로 요청할지(GET or POST)
 * 를 기재해야 데이터를 보내준다.
 * 
 * ex.) POST 요청 날리고 싶다?
 * <form action="요청할 url" method="post">
 * -> 요청을 저렇게 날릴 시 브라우저가 새로고침됨
 * 
 * 따라서 서버에 GET, POST 요청을 할 때 새로고침 없이
 * 데이터를 주고받을 수 있게 도와주는 간단한 브라우저 기능을
 * AJAX라고 한다. 새로고침 없어도 쇼핑몰 상품을 더 가져오거나
 * 댓글을 서버로 전송할 수도 있음.
 * 
 * ***AJAX로 GET/POST 요청하는 방법
 * 
 * 1. XMLHttpRequest라는 옛날 문법
 * 2. fetch()문법 쓰기
 * 3. axios같은 외부 라이브러리 쓰기
 * 
 * **/
