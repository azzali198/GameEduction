import React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from './Box.js';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const Carousels = () => {
  const [key, setKey] = useState('home');
  const elementClass = 'bg-primary text-primary-foreground p-4 rounded-lg'
  const containerClass = 'bg-white p-4'
  const textClass = 'text-black'
  return (
    <Carousel className="chemistry-carousel">
      <Carousel.Item>
        <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div  data-tooltip-id="Sc-tooltip" data-tooltip-content="Scandium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Sc' type='Sc' /></center></div>
                <Tooltip id="Sc-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ti-tooltip" data-tooltip-content="Titanium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ti' type='Ti' /></center></div>
                <Tooltip id="Ti-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="V-tooltip" data-tooltip-content="Vanadium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='V' type='V' /></center></div>
                <Tooltip id="V-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Cr-tooltip" data-tooltip-content="Chromium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Cr' type='Cr' /></center></div>
                <Tooltip id="Cr-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Mn-tooltip" data-tooltip-content="Manganese" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Mn' type='Mn' /></center></div>
                <Tooltip id="Mn-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ir-tooltip" data-tooltip-content="Iron" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Fe' type='Fe' /></center></div>
                <Tooltip id="Ir-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Mt-tooltip" data-tooltip-content="Meitnerium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Mt' type='Mt' /></center></div>
                <Tooltip id="Mt-tooltip" />
             </Col>
              <Col>
                <div data-tooltip-id="Co-tooltip" data-tooltip-content="Cobalt" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Co' type='Co' /></center></div>
                <Tooltip id="Co-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
            <Col>
            </Col>
              <Col>
                <div data-tooltip-id="Ni-tooltip" data-tooltip-content="Nickel" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ni' type='Ni' /></center></div>
                <Tooltip id="Ni-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Cu-tooltip" data-tooltip-content="Copper" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Cu' type='Cu' /></center></div>
                <Tooltip id="Cu-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Zn-tooltip" data-tooltip-content="Zinc" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Zn' type='Zn' /></center></div>
                <Tooltip id="Zn-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Y-tooltip" data-tooltip-content="Yttrium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Y' type='Y' /></center></div>
                <Tooltip id="Y-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Zr-tooltip" data-tooltip-content="Zirconium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Zr' type='Zr' /></center></div>
                <Tooltip id="Zr-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Nb-tooltip" data-tooltip-content="Nobium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Nb' type='Nb' /></center></div>
                <Tooltip id="Nb-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Mo-tooltip" data-tooltip-content="Molybdenum" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Mo' type='Mo' /></center></div>
                <Tooltip id="Mo-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Tc-tooltip" data-tooltip-content="Technetium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Tc' type='Tc' /></center></div>
                <Tooltip id="Tc-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>
          </center>
          </div>
          <Carousel.Caption>
            <div className={textClass}>
              <h5>Transition metal </h5>
            </div>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Ru-tooltip" data-tooltip-content="Ruthenium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ru' type='Ru' /></center></div>
                <Tooltip id="Ru-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Rh-tooltip" data-tooltip-content="Rhodium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Rh' type='Rh' /></center></div>
                <Tooltip id="Rh-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Pd-tooltip" data-tooltip-content="Palladium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Pd' type='Pd' /></center></div>
                <Tooltip id="Pd-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ag-tooltip" data-tooltip-content="Silver" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ag' type='Ag' /></center></div>
                <Tooltip id="Ag-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Cd-tooltip" data-tooltip-content="Cadmium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Cd' type='Cd' /></center></div>
                <Tooltip id="Cd-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="La-tooltip" data-tooltip-content="Lanthanum" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='La' type='La' /></center></div>
                <Tooltip id="La-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Hf-tooltip" data-tooltip-content="Hafnium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Hf' type='Hf' /></center></div>
                <Tooltip id="Hf-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ta-tooltip" data-tooltip-content="Tantalum" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ta' type='Ta' /></center></div>
                <Tooltip id="Ta-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
            <Col>
            </Col>
              <Col>
                <div data-tooltip-id="W-tooltip" data-tooltip-content="Tungsten" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='W' type='W' /></center></div>
                <Tooltip id="W-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Re-tooltip" data-tooltip-content="Rhenium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Re' type='Re' /></center></div>
                <Tooltip id="Re-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Os-tooltip" data-tooltip-content="Osmium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Os' type='Os' /></center></div>
                <Tooltip id="Os-tooltip" />
             </Col>
              <Col>
                <div data-tooltip-id="Ir-tooltip" data-tooltip-content="Iridium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ir' type='Ir' /></center></div>
                <Tooltip id="Ir-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Pt-tooltip" data-tooltip-content="Platinum" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Pt' type='Pt' /></center></div>
                <Tooltip id="Pt-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Au-tooltip" data-tooltip-content="Gold" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Au' type='Au' /></center></div>
                <Tooltip id="Au-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Hg-tooltip" data-tooltip-content="Mercury" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Hg' type='Hg' /></center></div>
                <Tooltip id="Hg-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ac-tooltip" data-tooltip-content="Actinium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ac' type='Ac' /></center></div>
                <Tooltip id="Ac-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Transition metal </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Rf-tooltip" data-tooltip-content="Rutherfordium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Rf' type='Rf' /></center></div>
                <Tooltip id="Rf-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Db-tooltip" data-tooltip-content="Dubnium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Db' type='Db' /></center></div>
                <Tooltip id="Db-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Sg-tooltip" data-tooltip-content="Seaborgium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Sg' type='Sg' /></center></div>
                <Tooltip id="Sg-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Bh-tooltip" data-tooltip-content="Bohrium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Bh' type='Bh' /></center></div>
                <Tooltip id="Bh-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Hs-tooltip" data-tooltip-content="Hassium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Hs' type='Hs' /></center></div>
                <Tooltip id="Hs-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Rg-tooltip" data-tooltip-content="Roentgenium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Rg' type='Rg' /></center></div>
                <Tooltip id="Rg-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>       
          </center>
          </div>
        <Carousel.Caption>
          <h5>Transition metal </h5>
        </Carousel.Caption>
        
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Al-tooltip" data-tooltip-content="Aluminum" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Al' type='Al' /></center></div>
                <Tooltip id="Al-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ga-tooltip" data-tooltip-content="Gallium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ga' type='Ga' /></center></div>
                <Tooltip id="Ga-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="In-tooltip" data-tooltip-content="Indium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='In' type='In' /></center></div>
                <Tooltip id="In-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Sn-tooltip" data-tooltip-content="Stannum" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Sn' type='Sn' /></center></div>
                <Tooltip id="Sn-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Tl-tooltip" data-tooltip-content="Thallium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Tl' type='Tl' /></center></div>
                <Tooltip id="Tl-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Pb-tooltip" data-tooltip-content="Lead" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Pb' type='Pb' /></center></div>
                <Tooltip id="Pb-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Bi-tooltip" data-tooltip-content="Bismuth" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Bi' type='Bi' /></center></div>
                <Tooltip id="Bi-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Fl-tooltip" data-tooltip-content="Flerovium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Fl' type='Fl' /></center></div>
                <Tooltip id="Fl-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Metal</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="B-tooltip" data-tooltip-content="Boron" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='B' type='B' /></center></div>
                <Tooltip id="B-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Si-tooltip" data-tooltip-content="Silicon" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Si' type='Si' /></center></div>
                <Tooltip id="Si-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ge-tooltip" data-tooltip-content="Germanium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ge' type='Ge' /></center></div>
                <Tooltip id="Ge-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="As-tooltip" data-tooltip-content="Arsenic" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='As' type='As' /></center></div>
                <Tooltip id="As-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Te-tooltip" data-tooltip-content="Tellurium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Te' type='Te' /></center></div>
                <Tooltip id="Te-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Sb-tooltip" data-tooltip-content="Antimony" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Sb' type='Sb' /></center></div>
                <Tooltip id="Sb-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Po-tooltip" data-tooltip-content="Polonium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Po' type='Po' /></center></div>
                <Tooltip id="Po-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Metalloid</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="C-tooltip" data-tooltip-content="Carbon" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='C' type='C' /></center></div>
                <Tooltip id="C-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="N-tooltip" data-tooltip-content="Nitrogen" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='N' type='N' /></center></div>
                <Tooltip id="N-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="O-tooltip" data-tooltip-content="Oxygen" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='O' type='O' /></center></div>
                <Tooltip id="O-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="P-tooltip" data-tooltip-content="Phosphorus" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='P' type='P' /></center></div>
                <Tooltip id="P-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="S-tooltip" data-tooltip-content="Sulfur" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='S' type='S' /></center></div>
                <Tooltip id="S-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Se-tooltip" data-tooltip-content="Selenium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Se' type='Se' /></center></div>
                <Tooltip id="Se-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="H-tooltip" data-tooltip-content="Hydrogen" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='H' type='H' /></center></div>
                <Tooltip id="H-tooltip" />
              </Col>
              <Col>
              </Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Non-Metal</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Be-tooltip" data-tooltip-content="Beryllium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Be' type='Be' /></center></div>
                <Tooltip id="Be-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Mg-tooltip" data-tooltip-content="Magnesium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Mg' type='Mg' /></center></div>
                <Tooltip id="Mg-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ca-tooltip" data-tooltip-content="Calcium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ca' type='Ca' /></center></div>
                <Tooltip id="Ca-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Sr-tooltip" data-tooltip-content="Strontium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Sr' type='Sr' /></center></div>
                <Tooltip id="Sr-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ba-tooltip" data-tooltip-content="Barium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ba' type='Ba' /></center></div>
                <Tooltip id="Ba-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ra-tooltip" data-tooltip-content="Radium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ra' type='Ra' /></center></div>
                <Tooltip id="Ra-tooltip" />
              </Col>
              <Col></Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Alkaline earth metal</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="He-tooltip" data-tooltip-content="Helium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='He' type='He' /></center></div>
                <Tooltip id="He-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ne-tooltip" data-tooltip-content="Neon" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ne' type='Ne' /></center></div>
                <Tooltip id="Ne-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ar-tooltip" data-tooltip-content="Argon" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ar' type='Ar' /></center></div>
                <Tooltip id="Ar-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Kr-tooltip" data-tooltip-content="Krypton" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Kr' type='Kr' /></center></div>
                <Tooltip id="Kr-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Xe-tooltip" data-tooltip-content="Xenon" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Xe' type='Xe' /></center></div>
                <Tooltip id="Xe-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Rn-tooltip" data-tooltip-content="Radon" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Rn' type='Rn' /></center></div>
                <Tooltip id="Rn-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Og-tooltip" data-tooltip-content="Organesson" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Og' type='Og' /></center></div>
                <Tooltip id="Og-tooltip" />
              </Col>
              <Col></Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Noble gaz</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="F-tooltip" data-tooltip-content="Fluorine" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='F' type='F' /></center></div>
                <Tooltip id="F-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Cl-tooltip" data-tooltip-content="Chlorine" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Cl' type='Cl' /></center></div>
                <Tooltip id="Cl-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Br-tooltip" data-tooltip-content="Bromine" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Br' type='Br' /></center></div>
                <Tooltip id="Br-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Kr-tooltip" data-tooltip-content="Krypton" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Kr' type='Kr' /></center></div>
                <Tooltip id="Kr-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="I-tooltip" data-tooltip-content="Iodine" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='I' type='I' /></center></div>
                <Tooltip id="I-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="At-tooltip" data-tooltip-content="Astatine" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='At' type='At' /></center></div>
                <Tooltip id="At-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ts-tooltip" data-tooltip-content="Tennessine" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ts' type='Ts' /></center></div>
                <Tooltip id="Ts-tooltip" />
              </Col>
              <Col></Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Halogen</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Li-tooltip" data-tooltip-content="Lithium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Li' type='Li' /></center></div>
                <Tooltip id="Li-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Na-tooltip" data-tooltip-content="Sodium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Na' type='Na' /></center></div>
                <Tooltip id="Na-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="K-tooltip" data-tooltip-content="Potassium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='K' type='K' /></center></div>
                <Tooltip id="K-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Rb-tooltip" data-tooltip-content="Rubidium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Rb' type='Rb' /></center></div>
                <Tooltip id="Rb-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Cs-tooltip" data-tooltip-content="Cesium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Cs' type='Cs' /></center></div>
                <Tooltip id="Cs-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Fr-tooltip" data-tooltip-content="Francium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Fr' type='Fr' /></center></div>
                <Tooltip id="Fr-tooltip" />
              </Col>
              <Col></Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Alkali metal</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Ac-tooltip" data-tooltip-content="Actinium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ac' type='Ac' /></center></div>
                <Tooltip id="Ac-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Th-tooltip" data-tooltip-content="Thorium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Th' type='Th' /></center></div>
                <Tooltip id="Th-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Pa-tooltip" data-tooltip-content="Protactinium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Pa' type='Pa' /></center></div>
                <Tooltip id="Pa-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="U-tooltip" data-tooltip-content="Uranium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='U' type='U' /></center></div>
                <Tooltip id="U-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Np-tooltip" data-tooltip-content="Neptunium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Np' type='Np' /></center></div>
                <Tooltip id="Np-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Pu-tooltip" data-tooltip-content="Plutonium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Pu' type='Pu' /></center></div>
                <Tooltip id="Pu-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Am-tooltip" data-tooltip-content="Americium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Am' type='Am' /></center></div>
                <Tooltip id="Am-tooltip" />
              </Col>
              <Col></Col>
            </Row>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Cm-tooltip" data-tooltip-content="Curium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Cm' type='Cm' /></center></div>
                <Tooltip id="Cm-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Bk-tooltip" data-tooltip-content="Berkelium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Bk' type='Bk' /></center></div>
                <Tooltip id="Bk-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Cf-tooltip" data-tooltip-content="Californium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Cf' type='Cf' /></center></div>
                <Tooltip id="Cf-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Es-tooltip" data-tooltip-content="Einsteinium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Es' type='Es' /></center></div>
                <Tooltip id="Es-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Fm-tooltip" data-tooltip-content="Fermium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Fm' type='Fm' /></center></div>
                <Tooltip id="Fm-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Md-tooltip" data-tooltip-content="Mendelevium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Md' type='Md' /></center></div>
                <Tooltip id="Md-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="No-tooltip" data-tooltip-content="Nobelium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='No' type='No' /></center></div>
                <Tooltip id="No-tooltip" />
              </Col>
              <Col></Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Actinides</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={containerClass} style={{ height: '250px' }}>
          <center>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Ln-tooltip" data-tooltip-content="Lanthanum" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ln' type='Ln' /></center></div>
                <Tooltip id="Ln-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ce-tooltip" data-tooltip-content="Cerium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ce' type='Ce' /></center></div>
                <Tooltip id="Ce-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Pr-tooltip" data-tooltip-content="Praseodymium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Pr' type='Pr' /></center></div>
                <Tooltip id="Pr-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Nd-tooltip" data-tooltip-content="Neodymium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Nd' type='Nd' /></center></div>
                <Tooltip id="Nd-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Pm-tooltip" data-tooltip-content="Promethium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Pm' type='Pm' /></center></div>
                <Tooltip id="Pm-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Sm-tooltip" data-tooltip-content="Samarium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Sm' type='Sm' /></center></div>
                <Tooltip id="Sm-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Eu-tooltip" data-tooltip-content="Europium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Eu' type='Eu' /></center></div>
                <Tooltip id="Eu-tooltip" />
              </Col>
              <Col></Col>
            </Row>
            <Row style={{ marginTop: '1px', marginBottom: '1px' }}>
              <Col>
              </Col>
              <Col>
                <div data-tooltip-id="Gd-tooltip" data-tooltip-content="Gadolinium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Gd' type='Gd' /></center></div>
                <Tooltip id="Gd-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Tb-tooltip" data-tooltip-content="Terbium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Tb' type='Tb' /></center></div>
                <Tooltip id="Tb-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Dy-tooltip" data-tooltip-content="Dysprosium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Dy' type='Dy' /></center></div>
                <Tooltip id="Dy-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Ho-tooltip" data-tooltip-content="Holmium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Ho' type='Ho' /></center></div>
                <Tooltip id="Ho-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Er-tooltip" data-tooltip-content="Erbium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Er' type='Er' /></center></div>
                <Tooltip id="Er-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Tm-tooltip" data-tooltip-content="Thulium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Tm' type='Tm' /></center></div>
                <Tooltip id="Tm-tooltip" />
              </Col>
              <Col>
                <div data-tooltip-id="Yb-tooltip" data-tooltip-content="Ytterbium" data-tooltip-place="bottom" style={{ width: '85%', border: '0.5px solid gray', padding: '2px' }}><center><Box name='Yb' type='Yb' /></center></div>
                <Tooltip id="Yb-tooltip" />
              </Col>
              <Col></Col>
            </Row>
          </center>
          </div>
        <Carousel.Caption>
          <h5>Lanthanides</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;