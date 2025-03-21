import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { logout } from "API";
// import { useNavigate } from "react-router-dom";

import routes from "routes.js";

function Header() {
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };
  const navigate = useNavigate();
  const [loading,setLoading]=React.useState(false);
  
  const logoutUser =async(e)=>{
    // setLoading(true);
    // e.preventDefault()
    // await logout().then(res=>{
    //   console.log("logged out")
    //   setLoading(false)
    //   console.log(res.data.redirectUrl)
    //   navigate("/home")
    // }).catch(e=>{
    //   setLoading(false)
    //   console.log(e.message)
    // })

    setLoading(true);
    e.preventDefault();
    try {
      await logout();
      console.log("Logged out");
      setLoading(false);
      navigate("/home"); 
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
    
  }


  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

//   return (
//     <Navbar bg="dark"  variant="dark" expand="lg" >
//       <Container fluid >
//         <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
//           <Button
//             variant="dark"
//             className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
//             onClick={mobileSidebarToggle}
//           >
//             <i className="fas fa-ellipsis-v"></i>
//           </Button>
//           <Navbar.Brand
//             style={{color:"white"}}
//             href="#home"
//             onClick={(e) => e.preventDefault()}
//             className="mr-2"
//           >
//             {getBrandText()}
//           </Navbar.Brand>
//         </div>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
//           <span className="navbar-toggler-bar burger-lines"></span>
//           <span className="navbar-toggler-bar burger-lines"></span>
//           <span className="navbar-toggler-bar burger-lines"></span>
//         </Navbar.Toggle>
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="nav mr-auto" navbar> 
//             {/* Already Comment out this code */}
//             {/* <Dropdown as={Nav.Item}>
//               <Dropdown.Toggle
//                 as={Nav.Link}
//                 data-toggle="dropdown"
//                 id="dropdown-67443507"
//                 variant="default"
//                 className="m-0"
//               >
//                 <i className="nc-icon nc-planet"></i>
//                 <span className="notification">5</span>
//                 <span className="d-lg-none ml-1">Manage Wallet</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Notification 1
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Notification 2
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Notification 3
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Notification 4
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Another notification
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown> */}
//           </Nav>
//           <Nav className="ml-auto" navbar>
//             <Nav.Item>
//               <Nav.Link
//                 // className="m-0"
//                 // href="/admin/user"
//                 style={{color:"white"}}
//                 onClick={(e) =>{
//                   e.preventDefault()
//                    navigate("/admin/user"); 
//                   // history.push("user")
//                 }
//                 }
//               >
//                 <span className="no-icon">Account</span>
//               </Nav.Link>
//             </Nav.Item> 
//             {/* Already Comment out this code */}
//             {/* <Dropdown as={Nav.Item}>
//               <Dropdown.Toggle
//                 aria-expanded={false}
//                 aria-haspopup={true}
//                 as={Nav.Link}
//                 data-toggle="dropdown"
//                 id="navbarDropdownMenuLink"
//                 variant="default"
//                 className="m-0"
//               >
//                 <span className="no-icon">Dropdown</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Action
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Another action
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Something
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Something else here
//                 </Dropdown.Item>
//                 <div className="divider"></div>
//                 <Dropdown.Item
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Separated link
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown> */}  
//             <Nav.Item>
//               <Nav.Link
//                 className="m-0"
//                 href="/"
//                 style={{color:"#F07459"}}
//                 onClick={logoutUser}
//               >
//                 <span className="no-icon">Log out</span>
//               </Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }


return (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
      {/* Left side: Brand & Sidebar Toggle */}
      <div className="d-flex align-items-center">
        <Button
          variant="dark"
          className="d-lg-none btn-fill rounded-circle p-2"
          onClick={(e) => {
            e.preventDefault();
            document.documentElement.classList.toggle("nav-open");
            const node = document.createElement("div");
            node.id = "bodyClick";
            node.onclick = function () {
              document.documentElement.classList.toggle("nav-open");
              this.remove();
            };
            document.body.appendChild(node);
          }}
        >
          <i className="fas fa-ellipsis-v"></i>
        </Button>
        <Navbar.Brand href="#home" onClick={(e) => e.preventDefault()} className="text-white">
          {getBrandText()}
        </Navbar.Brand>
      </div>

      {/* Right side: Account & Logout */}
      <Nav className="ml-auto d-flex align-items-center nav-right">
        <Nav.Item>
          <Nav.Link
            href="/admin/user"
            className="nav-link-custom"
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/user");
            }}
          >
            Account
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="logout-link" href="/" onClick={logoutUser}>
            {loading ? "Logging out..." : "Log out"}
          </Nav.Link>
        </Nav.Item>
      </Nav>

    </Container>

    {/* Add Styles for Navbar */}
    <style>
      {`
        .nav-link-custom {
          color: white !important;
          font-size: 16px;
          padding: 10px 15px;
          transition: color 0.3s ease;
          text-decoration: none;
        }
        .nav-link-custom:hover {
          color: #f39c12 !important;
        }
        .logout-link {
          color: #f07459 !important;
          font-size: 16px;
          padding: 10px 15px;
          transition: color 0.3s ease;
          text-decoration: none;
        }
        .logout-link:hover {
          color: #ff6347 !important;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .nav-right {
          margin-left: auto; /* Push to right */
          display: flex;
          gap: 20px;
        }
        .navbar-toggler-bar {
          background: white;
        }
      `}
    </style>
  </Navbar>
);
}


export default Header;
