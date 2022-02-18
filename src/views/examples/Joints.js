/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import "assets/scss/walkingrobot.scss";
// reactstrap components
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Axios from "axios";
import {robotcommand, robotstatedata, robotpower} from "../../network/ApiAxios";
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import {robotpower} from "../../network/ApiAxios";

// const Tables = () => {
function Jointdata(){
  let [datapower, setDatapower] = useState("0");
    


  let [datajoint, setDatajoint] = useState("0");
  let [datajointcommand, setDatajointCommmad] = useState("0");
  let [id, setId] = useState("");
  // joints
  let [joint_l_hip, setjoint_l_hip] = useState("0.0");
  let [joint_l_knee, setjoint_l_knee] = useState("0.0");
  let [joint_r_hip, setjoint_r_hip] = useState("0.0");
  let [joint_r_knee, setjoint_r_knee] = useState("0.0");
  let [joint_l_hipc, setjoint_l_hipc] = useState("");
  let [joint_l_kneec, setjoint_l_kneec] = useState("");
  let [joint_r_hipc, setjoint_r_hipc] = useState("");
  let [joint_r_kneec, setjoint_r_kneec] = useState("");
  let [state_command, setstate_command] = useState([true, false]);
  let [buttonstate, setbuttonstate] = useState(true);
  let [autobuttonstate, setautobuttonstate] = useState(true);
  let [squartbuttonstate, setsquartbuttonstate] = useState(true);
  let [walkingbuttonstate, setwalkingbuttonstate] = useState(true);
  let [jointpowerstate, setjointpowerstate] = useState(true);
  const mounted = useRef(false);
  var checkpoint = 0;
  //Auto squart mode
  const timer = ms => new Promise(res=> setTimeout(res,ms))
  const getpowerGroupList = async () =>{
    // await Axios.get('http://192.168.0.60:5100/api/users/robotsbattery/find')
    await Axios.get('http://www.angel-wasp.com:5100/api/users/robotsbattery/find')
    .then((result)=>{
      var arraydata1 = [];
      // var arrayid = [];
      // console.log(result.data[0].percentage);
      arraydata1.push(result.data[0].percentage);
      
      setDatapower(arraydata1);
      // setId(arrayid);
    })
  };
  useEffect(() => {
    getpowerGroupList();
  }, [datapower]);
  async function autoload() {
    let i = 2;
    let arrayCopy1 = [...joint_l_hipc];
    let arrayCopy2 = [...joint_r_hipc];
    let arrayCopy3 = [...joint_l_kneec];
    let arrayCopy4 = [...joint_r_kneec];
    console.log(joint_l_hipc);
    
    while(i>0){
      if ( i % 2 == 0 )
       {
        
        if(autobuttonstate == true){ 
          let arrayCopy1 = [...joint_l_hipc];
          let arrayCopy2 = [...joint_r_hipc];
          let arrayCopy3 = [...joint_l_kneec];
          let arrayCopy4 = [...joint_r_kneec];
          console.log(arrayCopy1)
          arrayCopy1.unshift(joint_l_hip);
          arrayCopy2.unshift(joint_r_hip);
          arrayCopy3.unshift(joint_l_knee);
          arrayCopy4.unshift(joint_r_knee);
          
          setjoint_l_hipc( arrayCopy1 );
          setjoint_r_hipc( arrayCopy2 );
          setjoint_l_kneec( arrayCopy3 );
          setjoint_r_kneec( arrayCopy4 );
          console.log(joint_l_hipc[0])
          console.log(joint_l_hipc); 
          await robotcommand(joint_l_hipc[0], joint_l_kneec[0], joint_r_hipc[0], joint_r_kneec[0])
          
          await timer(2000);
          i--;
        }
        else if(autobuttonstate == false){
          // console.log(joint_l_hipc);
          arrayCopy1.unshift("0.0");
          arrayCopy2.unshift("0.0");
          arrayCopy3.unshift("0.0");
          arrayCopy4.unshift("0.0");
          setjoint_l_hipc( arrayCopy1 );
          setjoint_r_hipc( arrayCopy2 );
          setjoint_l_kneec( arrayCopy3 );
          setjoint_r_kneec( arrayCopy4 );

          break;
        }
         }
        else 
        {
          
          if(autobuttonstate == true){ 
            let arrayCopy1 = [...joint_l_hipc];
            let arrayCopy2 = [...joint_r_hipc];
            let arrayCopy3 = [...joint_l_kneec];
            let arrayCopy4 = [...joint_r_kneec];  
              
            arrayCopy1.unshift("0.0");
            arrayCopy2.unshift("0.0");
            arrayCopy3.unshift("0.0");
            arrayCopy4.unshift("0.0");
            setjoint_l_hipc( arrayCopy1 );
            setjoint_r_hipc( arrayCopy2 );
            setjoint_l_kneec( arrayCopy3 );
            setjoint_r_kneec( arrayCopy4 );
            console.log(joint_l_hipc[0]); 
            console.log(joint_l_hipc); 
            await robotcommand(joint_l_hipc[0], joint_l_kneec[0], joint_r_hipc[0], joint_r_kneec[0])

            await timer(2000);
            i--;
            if (i == 0){
              setautobuttonstate(true)
            }
          }
        else if(autobuttonstate == false){
          console.log(joint_l_hipc[0]);
          arrayCopy1.unshift("0.0");
          arrayCopy2.unshift("0.0");
          arrayCopy3.unshift("0.0");
          arrayCopy4.unshift("0.0");
          setjoint_l_hipc( arrayCopy1 );
          setjoint_r_hipc( arrayCopy2 );
          setjoint_l_kneec( arrayCopy3 );
          setjoint_r_kneec( arrayCopy4 );

          break;
        }
        }

    }
  }

  async function squartload() {
    let i = 5;
    // let arrayCopy1 = [...joint_l_hipc];
    // let arrayCopy2 = [...joint_r_hipc];
    // let arrayCopy3 = [...joint_l_kneec];
    // let arrayCopy4 = [...joint_r_kneec];
    // console.log(joint_l_hipc);
    console.log(squartbuttonstate);
    squartbuttonstate === true
      ? setsquartbuttonstate(false)
      : setsquartbuttonstate(true)
    while(i>0){
      
      console.log(squartbuttonstate);
      let arrayCopy1 = [...joint_l_hipc];
      let arrayCopy2 = [...joint_r_hipc];
      let arrayCopy3 = [...joint_l_kneec];
      let arrayCopy4 = [...joint_r_kneec];
      if (i == 0){
        setsquartbuttonstate(true)
      }
      if ( i % 2 == 0 && squartbuttonstate == true )
        {
          console.log(squartbuttonstate);
          if(squartbuttonstate == true){ 
            arrayCopy1.unshift("700");
            arrayCopy2.unshift("700");
            arrayCopy3.unshift("500");
            arrayCopy4.unshift("500");
            console.log(arrayCopy1);
            setjoint_l_hipc( arrayCopy1 );
            setjoint_r_hipc( arrayCopy2 );
            setjoint_l_kneec( arrayCopy3 );
            setjoint_r_kneec( arrayCopy4 );
            console.log(joint_l_hipc);
            var l_hip = joint_l_hipc[2];
            var l_knee = joint_l_kneec[2];
            var r_hip = joint_r_hipc[2];
            var r_knee = joint_r_kneec[2];
            console.log(l_hip);
            robotcommand("700", "500", "700", "500")
            await timer(2000);
            i--;
          }
          else if(squartbuttonstate == false){
            arrayCopy1.unshift("0.0");
            arrayCopy2.unshift("0.0");
            arrayCopy3.unshift("0.0");
            arrayCopy4.unshift("0.0");
            setjoint_l_hipc( arrayCopy1 );
            setjoint_r_hipc( arrayCopy2 );
            setjoint_l_kneec( arrayCopy3 );
            setjoint_r_kneec( arrayCopy4 );
            break;
          }
        } 
        else 
        {
          if(squartbuttonstate == true){      
            arrayCopy1.unshift("0.0");
            arrayCopy2.unshift("0.0");
            arrayCopy3.unshift("0.0");
            arrayCopy4.unshift("0.0");
            setjoint_l_hipc( arrayCopy1 );
            setjoint_r_hipc( arrayCopy2 );
            setjoint_l_kneec( arrayCopy3 );
            setjoint_r_kneec( arrayCopy4 );
            var l_hip = joint_l_hipc[0];
            var l_knee = joint_l_kneec[0];
            var r_hip = joint_r_hipc[0];
            var r_knee = joint_r_kneec[0];
            robotcommand(l_hip, l_knee, r_hip, r_knee)
            await timer(2000);
            i--;
            if (i == 0){
              setsquartbuttonstate(true)
            }
          }
        else if(squartbuttonstate == false){
          arrayCopy1.unshift("0.0");
          arrayCopy2.unshift("0.0");
          arrayCopy3.unshift("0.0");
          arrayCopy4.unshift("0.0");
          setjoint_l_hipc( arrayCopy1 );
          setjoint_r_hipc( arrayCopy2 );
          setjoint_l_kneec( arrayCopy3 );
          setjoint_r_kneec( arrayCopy4 );
          break;
        }
        }

      }
    }
    async function walkingload() {
      let i = 5;
      let arrayCopy1 = [...joint_l_hipc];
      let arrayCopy2 = [...joint_r_hipc];
      let arrayCopy3 = [...joint_l_kneec];
      let arrayCopy4 = [...joint_r_kneec];
      console.log(joint_l_hipc);
      while(i>0){
        await checkpoint;
        console.log("checkpoint: " + checkpoint);
        if (checkpoint == 0)
        {return} 
        if ( i % 2 == 0 )
         {
          walkingbuttonstate === true
          ? setwalkingbuttonstate(false)
          : setwalkingbuttonstate(true)
          if(walkingbuttonstate == true){ 
            arrayCopy1.unshift("700.0");
            arrayCopy2.unshift("-700.0");
            arrayCopy3.unshift("200.0");
            arrayCopy4.unshift("-200.0");
            setjoint_l_hipc( arrayCopy1 );
            setjoint_r_hipc( arrayCopy2 );
            setjoint_l_kneec( arrayCopy3 );
            setjoint_r_kneec( arrayCopy4 );
            console.log("checkpoint")
            robotcommand(arrayCopy1[0], arrayCopy3[0], arrayCopy2[0], arrayCopy4[0])
            console.log("checkpoint")
            await timer(2000);
            console.log("checkpoint")
            i--;
          }
          else if(walkingbuttonstate == false){
            arrayCopy1.unshift("0.0");
            arrayCopy2.unshift("0.0");
            arrayCopy3.unshift("0.0");
            arrayCopy4.unshift("0.0");
            setjoint_l_hipc( arrayCopy1 );
            setjoint_r_hipc( arrayCopy2 );
            setjoint_l_kneec( arrayCopy3 );
            setjoint_r_kneec( arrayCopy4 );
            break;
          }
           }
          else 
          {
            walkingbuttonstate === true
            ? setwalkingbuttonstate(false)
            : setwalkingbuttonstate(true)
            if(walkingbuttonstate == true){   
              if (i == 1 ){
              console.log("checkpoint")
              arrayCopy1.unshift("0.0");
              arrayCopy2.unshift("0.0");
              arrayCopy3.unshift("0.0");
              arrayCopy4.unshift("0.0");
              }    
              else{
              arrayCopy1.unshift("-700.0");
              arrayCopy2.unshift("700.0");
              arrayCopy3.unshift("-200.0");
              arrayCopy4.unshift("200.0");
            }
              setjoint_l_hipc( arrayCopy1 );
              setjoint_r_hipc( arrayCopy2 );
              setjoint_l_kneec( arrayCopy3 );
              setjoint_r_kneec( arrayCopy4 );
              robotcommand(arrayCopy1[0], arrayCopy3[0], arrayCopy2[0], arrayCopy4[0])
              await timer(2000);
              i--;
              if (i == 0){
                setwalkingbuttonstate(true)
              }
            }
          else if(walkingbuttonstate == false){
            arrayCopy1.unshift("0.0");
            arrayCopy2.unshift("0.0");
            arrayCopy3.unshift("0.0");
            arrayCopy4.unshift("0.0");
            setjoint_l_hipc( arrayCopy1 );
            setjoint_r_hipc( arrayCopy2 );
            setjoint_l_kneec( arrayCopy3 );
            setjoint_r_kneec( arrayCopy4 );
            break;
          }
          }
  
        }
      }

  const getjointcommnad = async () =>{
    var l_hip = joint_l_hipc[0];
    var l_knee = joint_l_kneec[0];
    var r_hip = joint_r_hipc[0];
    var r_knee = joint_r_kneec[0];
    console.log(l_hip);
    console.log(l_knee);
    console.log(r_hip);
    console.log(r_knee);
    // var state = state_command[0];
    console.log("hellooooooo")
    await robotcommand(l_hip, l_knee, r_hip, r_knee)
    .then(()=>{
      state_command = "false";
    })
  };
  useEffect(() => {
      getjointcommnad();
  }, [buttonstate]);

  // useEffect(() => {
  //   getjointcommnad();
  // }, [squartbuttonstate]);

  // useEffect(() => {
  //   getjointcommnad();
  // }, [walkingbuttonstate]);

  // useEffect(() => {
  //   var l_hip = joint_l_hipc[0];
  //   var l_knee = joint_l_kneec[0];
  //   var r_hip = joint_r_hipc[0];
  //   var r_knee = joint_r_kneec[0];
  //   getjointcommnad();
  // }, []);


  const getGroupList = async () =>{
    await Axios.get('http://www.angel-wasp.com:5100/api/users/robotsjoint/find')
    .then((result)=>{
      var arraydata = [];
      var arrayid = [];
      for (var i = 0; i < 4; i ++){
        arraydata.push(result.data[i])
      }
      setDatajoint(arraydata);
      // setId(arrayid);
    })
  };
  useEffect(() => {
    getGroupList();
  }, [datajoint]);

  const getGroupListcommand = async () =>{
    await Axios.get('http://www.angel-wasp.com:5100/api/users/robotsjointcommand/find')
    .then((result)=>{
      var arraydata1 = [];
      for (var i = 0; i < 4; i ++){
        arraydata1.push(result.data[i])
        // console.log(result.data[i])
      }
      setDatajointCommmad(arraydata1);
      // setId(arrayid);
    })
  };
  useEffect(() => {
    getGroupListcommand();
  }, [datajointcommand]);



  // robotstate = battery checker 
  const getpowerstate = async () =>{
    await robotstatedata(id)
    .then((result)=>{
        if(result.data[0].power = "off")
        {
          setjointpowerstate(true)
        }
      }
    )
  };
  useEffect(() => {
    getpowerstate();
  }, []);
  function powertest(){
    if(jointpowerstate = true)
        {
          return <Spinner animation="grow" size="sm" variant="success" />
        }
  }

    return (
      <>
        <div className="header bg-gradient-default pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Robots
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            2
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Cycles
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            2,356
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Members
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">54</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Battery
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {datapower}%
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-down" /> 1%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {/* Page content */}

        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Statement [ ID: {datajoint[0].id} ] </h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Joint name</th>
                      <th scope="col">Current position(deg)</th>
                      <th scope="col">Effort</th>
                      <th scope="col">Liveness</th>
                      <th scope="col">mode</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
            
                          <Media>
                            <span className="mb-0 text-sm">
                              Left Hip
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{datajoint[0].left_hip}</td>
                      <td>{datajointcommand[0].left_hip}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <>
                          {powertest()}
                          </>  
                          <>
                          {jointpowerstate === true
                          ? " Activated"
                          : "Deactivate"
                          }
                          </>                                                         
                        </Badge>
                      </td>
                      
                      <td>
                        Demo
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
            
                          <Media>
                            <span className="mb-0 text-sm">
                              Right Hip
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{datajoint[0].right_hip}</td>
                      <td>{datajointcommand[0].right_hip}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                        <Spinner animation="grow" size="sm" variant="success" /> Activated
                        </Badge>
                      </td>
                      <td>
                        Demo
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
            
                          <Media>
                            <span className="mb-0 text-sm">
                              Left Knee
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{datajoint[0].left_knee}</td>
                      <td>{datajointcommand[0].left_knee}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                        <Spinner animation="grow" size="sm" variant="success" /> Activated
                        </Badge>
                      </td>
                      <td>
                        Demo
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
            
                          <Media>
                            <span className="mb-0 text-sm">
                              Right Knee
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{datajoint[0].right_knee}</td>
                      <td>{datajointcommand[0].right_knee}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                        <Spinner animation="grow" size="sm" variant="success" /> Activated
                        </Badge>
                      </td>
                      <td>
                        Demo
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
     
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* <form class="row g-2"> */}
          <Form.Text className="mt-5" id="passwordHelpBlock" muted>
            LEFT HIP
          </Form.Text>
          <ProgressBar striped variant="success"  max="2000" animated now={Math.abs(datajointcommand[0].left_hip)} label={`${datajointcommand[0].left_hip}`} />
          <Form.Text className="mt-1" id="passwordHelpBlock" muted>
            RIGHT HIP
          </Form.Text>
          <ProgressBar striped variant="success"  max="2000" animated now={Math.abs(datajointcommand[0].right_hip)} label={`${datajointcommand[0].right_hip}`} />
          <Form.Text className="mt-1" id="passwordHelpBlock" muted>
            LEFT KNEE
          </Form.Text>
          <ProgressBar striped variant="info" max="2000" animated now={Math.abs(datajointcommand[0].left_knee)} label={`${datajointcommand[0].left_knee}`}/>
          <Form.Text className="mt-1" id="passwordHelpBlock" muted>
            RIGHT KNEE
          </Form.Text>
          <ProgressBar striped variant="info" max="2000" animated now={Math.abs(datajointcommand[0].right_knee)} label={`${datajointcommand[0].right_knee}`}/>
          <Form>
          <Row>
            <Col>
          <Form.Label className="mt-5" htmlFor="inputPassword5">Left Hip</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            // value={text}
            onChange={(e)=>{setjoint_l_hip(e.target.value)}}
          />
          <Form.Text id="passwordHelpBlock" muted>
            range from 0 to 2000
          </Form.Text>
          </Col>
          <Col>
          <Form.Label className="mt-5" htmlFor="inputPassword5">Right Hip</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(e)=>{setjoint_r_hip(e.target.value)}}
          />
          <Form.Text id="passwordHelpBlock" muted>
            range from 0 to 2000
          </Form.Text>
          </Col>
          </Row>
          <Row>
          <Col>
          <Form.Label className="mt-5" htmlFor="inputPassword5">Left Knee</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(e)=>{setjoint_l_knee(e.target.value)}}
          />
          <Form.Text id="passwordHelpBlock" muted>
            range from 0 to 2000
          </Form.Text>
          </Col>
          <Col>
          <Form.Label className="mt-5" htmlFor="inputPassword5">Right Knee</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(e)=>{setjoint_r_knee(e.target.value)}}
          />
          <Form.Text id="passwordHelpBlock" muted>
            range from 0 to 2000
          </Form.Text>
          </Col>
          </Row>
          </Form>
          {/* </form> */}
          <Button className="mt-5" onClick={()=>{
            let arrayCopy1 = [...joint_l_hipc];
            let arrayCopy2 = [...joint_r_hipc];
            let arrayCopy3 = [...joint_l_kneec];
            let arrayCopy4 = [...joint_r_kneec];
            // console.log(joint_l_hipc);
            
            buttonstate === true
            ? setbuttonstate(false)
            : setbuttonstate(true)
            if(buttonstate == true){     
              if(joint_l_hip>2000 || joint_r_hip>2000 || joint_l_knee>2000 || joint_r_knee>2000)  
              { arrayCopy1.unshift("0.0");
              arrayCopy2.unshift("0.0");
              arrayCopy3.unshift("0.0");
              arrayCopy4.unshift("0.0");
              setjoint_l_hipc( arrayCopy1 );
              setjoint_r_hipc( arrayCopy2 );
              setjoint_l_kneec( arrayCopy3 );
              setjoint_r_kneec( arrayCopy4 ); } 
              else{ 
              console.log(joint_l_hip)
              arrayCopy1.unshift(joint_l_hip);
              arrayCopy2.unshift(joint_r_hip);
              arrayCopy3.unshift(joint_l_knee);
              arrayCopy4.unshift(joint_r_knee);
              setjoint_l_hipc( arrayCopy1 );
              setjoint_r_hipc( arrayCopy2 );
              setjoint_l_kneec( arrayCopy3 );
              setjoint_r_kneec( arrayCopy4 );
              }
            }
            else if(buttonstate == false){
              console.log(buttonstate);
              arrayCopy1.unshift("0.0");
              arrayCopy2.unshift("0.0");
              arrayCopy3.unshift("0.0");
              arrayCopy4.unshift("0.0");
              setjoint_l_hipc( arrayCopy1 );
              setjoint_r_hipc( arrayCopy2 );
              setjoint_l_kneec( arrayCopy3 );
              setjoint_r_kneec( arrayCopy4 );
            }
          }} type="submit">{buttonstate === true ? 'Manual mode ON' : 'Manual mode OFF'}!</Button>
          <Button className="mt-5" onClick={()=>{
            squartload();
          }} type="submit">{squartbuttonstate === true ? 'Squart Mode ON' : 'Squart Mode OFF'}!</Button>

          {/* </form> */}
          {/* <Button className="mt-5" onClick={()=>{
            autobuttonstate === true
            ? setautobuttonstate(false)
            : setautobuttonstate(true)
            autoload();
          }} type="submit">{autobuttonstate === true ? 'Auto mode ON' : 'Auto mode OFF'}!</Button> */}

          

           <Button className="mt-5" onClick={()=>{
            
            if(checkpoint==0){
              checkpoint=1;
              console.log("ch:"+checkpoint);
            }
            else {
              checkpoint = 0
            }
            walkingload();
          }} type="submit">{walkingbuttonstate === true ? 'Walking Mode ON' : 'Walking Mode OFF'}!</Button>

          
          
          {/* Dark table */}
          {/* <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Card tables</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Project</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Status</th>
                      <th scope="col">Users</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/bootstrap.jpg").default}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Argon Design System
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$2,500 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          pending
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip731399078"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731399078"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip491083084"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip491083084"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip528540780"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip528540780"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip237898869"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip237898869"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-warning"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/angular.jpg").default}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Angular Now UI Kit PRO
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$1,800 USD</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip188614932"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip188614932"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip66535734"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip66535734"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip427561578"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip427561578"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip904098289"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip904098289"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">100%</span>
                          <div>
                            <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/sketch.jpg").default}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Black Dashboard
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$3,150 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-danger" />
                          delayed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip707904950"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip707904950"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip353988222"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip353988222"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip467171202"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip467171202"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip362118155"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip362118155"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">72%</span>
                          <div>
                            <Progress
                              max="100"
                              value="72"
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/react.jpg").default}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              React Material Dashboard
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$4,400 USD</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-info" />
                          on schedule
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip226319315"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip226319315"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip711961370"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip711961370"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip216246707"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip216246707"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip638048561"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip638048561"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">90%</span>
                          <div>
                            <Progress
                              max="100"
                              value="90"
                              barClassName="bg-info"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/vue.jpg").default}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Vue Paper UI Kit PRO
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$2,200 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip781594051"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip781594051"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip840372212"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip840372212"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip497647175"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip497647175"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip951447946"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg").default}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip951447946"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">100%</span>
                          <div>
                            <Progress
                              max="100"
                              value="100"
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row> */}
        </Container>
      </>
    );
}

export default Jointdata;
