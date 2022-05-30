import "./styles.css";
import "./grid.css";
import { ReactComponent as ToriIcon } from "./icons/tori.svg";
import { ReactComponent as DownIcon } from "./icons/carrot.svg";
import { ReactComponent as TabletIcon } from "./icons/tablet.svg";
import { ReactComponent as ComputerIcon } from "./icons/computer.svg";
import { ReactComponent as DegreeIcon } from "./icons/degree.svg";
import { ReactComponent as LeftIcon } from "./icons/left.svg";
import { ReactComponent as ResumeIcon } from "./icons/resume.svg";
import { ReactComponent as AddressIcon } from "./icons/address.svg";
import { ReactComponent as RightIcon } from "./icons/right.svg";

import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

//function Component
export default function App() {
  //JSX which is HTML in JS output.
  return (
    <div className="App">
      <Navibar>
        <NaviItem icon={<ResumeIcon />} />
        <NaviItem icon={<DegreeIcon />} />
        <NaviItem icon={<AddressIcon />} />

        <NaviItem icon={<DownIcon />}>
          <DropdownMenu />
        </NaviItem>
      </Navibar>

      <GridBox />
    </div>
  );
}

function GridBox() {
  return (
    <section className="grid">
      <div className="grid-card">あ</div>
      <div className="grid-card">え</div>
      <div className="grid-card">い</div>
      <div className="grid-card">お</div>
      <div className="grid-card">う</div>
      <div className="grid-card">か</div>
      <div className="grid-card">け</div>
      <div className="grid-card">き</div>
      <div className="grid-card">こ</div>
      <div className="grid-card">く</div>
      <div className="grid-card">さ</div>
      <div className="grid-card">せ</div>
      <div className="grid-card">し</div>
    </section>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<ToriIcon />}
            rightIcon={<RightIcon />}
            goToMenu="more"
          >
            さらに詳しく
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "more"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<LeftIcon />}></DropdownItem>
          <DropdownItem leftIcon={<ComputerIcon />}>Vanilla JS</DropdownItem>
          <DropdownItem leftIcon={<ComputerIcon />}>React</DropdownItem>
          <DropdownItem leftIcon={<ComputerIcon />}>Flutter</DropdownItem>
          <DropdownItem leftIcon={<ComputerIcon />}>Vue</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
//Props are parameters to insert
function Navibar(props) {
  return (
    <nav className="navibar">
      <ul className="navibar-nav"> {props.children}</ul>
    </nav>
  );
}

function NaviItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="navi-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}
