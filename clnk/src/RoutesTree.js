import React from 'react';
import {Switch, Route} from 'react-router-dom';
import withPageTitle from './components/withPageTitle/withPageTitle';

import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper.component';
import HomePage from './pages/HomePage/HomePage.component';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage.component';
import AllTagsPage from './pages/AllTagsPage/AllTagsPage.component';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage.component';
import Register from './pages/Register/Register.component';
import Login from './pages/Login/Login.component';
import Post from './pages/Post/Post.component';
import PostForm from './pages/PostForm/PostForm.component';
import TagPage from './pages/TagPage/TagPage.component';
import ProfilePage from './pages/ProfilePage/ProfilePage.component';
import NotFound from './pages/NotFound/NotFound.component';

const HomePageComponent = withPageTitle({
  component: LayoutWrapper({component: HomePage}),
  title:
    'UCET Community',
});

const QuestionsPageComponent = withPageTitle({
  component: LayoutWrapper({component: QuestionsPage}),
  title: 'All Questions - UCET Community',
});

const AllTagsPageComponent = withPageTitle({
  component: LayoutWrapper({component: AllTagsPage}),
  title: 'Tags - UCET Community',
});

const AllUsersPageComponent = withPageTitle({
  component: LayoutWrapper({component: AllUsersPage}),
  title: 'Users - UCET Community',
});

const RegisterComponent = withPageTitle({
  component: Register,
  title: 'Sign Up - UCET Community',
});

const LoginComponent = withPageTitle({
  component: Login,
  title: 'Log In - UCET Community',
});

const PostFormComponent = withPageTitle({
  component: PostForm,
  title: 'Ask a Question - UCET Community',
});

const NotFoundComponent = withPageTitle({
  component: NotFound,
  title: 'Error 404',
});

const PostComponent = LayoutWrapper({component: Post});
const ProfilePageComponent = LayoutWrapper({component: ProfilePage});
const TagPageComponent = LayoutWrapper({component: TagPage});

const RoutesTree = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePageComponent} />
      <Route exact path='/questions' component={QuestionsPageComponent} />
      <Route exact path='/tags' component={AllTagsPageComponent} />
      <Route exact path='/users' component={AllUsersPageComponent} />
      <Route exact path='/register' component={RegisterComponent} />
      <Route exact path='/login' component={LoginComponent} />
      <Route exact path='/questions/:id' component={PostComponent} />
      <Route exact path='/users/:id' component={ProfilePageComponent} />
      <Route exact path='/tags/:tagname' component={TagPageComponent} />
      <Route exact path='/add/question' component={PostFormComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Switch>
  );
};

export default RoutesTree;
