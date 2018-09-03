import React from 'react';

export default class UserProfile extends React.Component {

  constructor(props) {
    super();
    this.state = {...props, name: 'John Smith', editingName: false};
  }

  render() {
    return (
      <section className={'user-profile'}>
        <div className={'user-profile__image-container'}>
          <div className={'user-profile__image'}></div>
        </div>

        <div className={'user-profile__content-container'}>
          <div className={'user-profile__name'}>

            {this.state.editingName ? <input value={this.state.name} onChange={e => this.setState({name: e.target.value})} type={'text'} /> : this.state.name}

            <button className={'user-profile__edit-button'} onClick={() => this.setState({editingName: !this.state.editingName})}>{this.state.editingName ? 'Save' : 'Edit'}</button>
          </div>
          <div className={'user-profile__job-title'}>Lead Developer</div>
          <div className={'user-profile__description'}>I am an experienced lead developer at Darwin Digital. I like
            writing React
            and CSS. In my spare time I write even more React and play rugby.
          </div>
        </div>
      </section>
    );
  }
}
