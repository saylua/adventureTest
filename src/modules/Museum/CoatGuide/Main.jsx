import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import coatList from 'models/SpriteCoat/coatList';
import SayluaView from 'components/SayluaView';

import './CoatGuide.css';

export default class CoatGuide extends Component {
  render() {
    return (
      <SayluaView title="Sprite Coat Guide">
        <h1>Sprite Coat Guide</h1>
        <div className="breadcrumbs">
          <Link to="/museum" className="breadcrumbs-link">Museum</Link>
          <span className="separator">
            &raquo;
          </span>
          <Link to="/species" className="breadcrumbs-link">Species Guide</Link>
          <Link to="/coats" className="breadcrumbs-link breadcrumbs-active">Coat Guide</Link>
        </div>
        Each species of sprite on Saylua can be found in a variety of different
        coats. See them all here!
        <div className="coat-guide-list">
          {
            coatList.map(coat => (
              <img src={coat.imageUrl()} alt={coat.fullName()} />
            ))
          }
        </div>
      </SayluaView>
    );
  }
}