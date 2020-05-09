import React, {useState} from 'react';
import {Map, List} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {useDispatch} from 'react-redux';

const UserProfile : React.FC = props => {
  const [editingName, setEditingName] = useState<boolean>(false);
  const [name, setName] = useState<string>('John Smith');
  return <section className={'user-profile'}>
    <div className={'user-profile__image-container'}>
      <div className={'user-profile__image'} />
    </div>

    <div className={'user-profile__content-container'}>
      <div className={'user-profile__name'}>

        {editingName ? <input value={name} onChange={e => setName(e.target.value)} type={'text'} /> : name}

        <button className={'user-profile__edit-button'} onClick={() => setEditingName(!editingName)}>{editingName ? 'Save' : 'Edit'}</button>
      </div>
      <div className={'user-profile__job-title'}>Lead Developer <i className="fab fa-amazon-pay" /></div>
      <div className={'user-profile__description'}>I am an experienced lead developer at Darwin Digital. I like
        writing React
        and CSS. In my spare time I write even more React and play rugby.
      </div>
    </div>
  </section>;
};

export default UserProfile;
