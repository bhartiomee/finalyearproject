import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../redux/posts/posts.actions';
import handleSorting from '../../services/handleSorting';

import LinkButton from '../../components/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Pagination from "../../components/Pagination/Pagination.component";

import '../QuestionsPage/QuestionsPage.styles.scss'

const itemsPerPage = 10;

const AllBlogsPage = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
 
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('Newest');

  let searchQuery = new URLSearchParams(useLocation().search).get('search');

  const handlePaginationChange = (e, value) => setPage(value);
  console.log(posts)
  return loading || posts === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      {searchQuery ? (
        <PageTitle
          title={`Search Results for ${searchQuery} - UCET Community`}
        />
      ) : (
        ''
      )}
      <div id='mainbar' className='questions-page fc-black-800'>
        <div className='questions-grid'>
          <h3 className='questions-headline'>
            {searchQuery ? 'Search Results' : 'All Blogs'}
          </h3>
          <div className='questions-btn'>
            <LinkButton
              text={'Add Post'}
              link={'/add/question'}
            />
          </div>
        </div>
        {searchQuery ? (
          <div className='search-questions'>
            <span style={{color: '#acb2b8', fontSize: '12px'}}>
              Results for {searchQuery}
            </span>
            <SearchBox placeholder={'Search...'} name={'search'} pt={'mt8'} />
          </div>
        ) : (
          ''
        )}
        <div className='questions-tabs'>
          <span>
            {new Intl.NumberFormat('en-IN').format(posts.filter(posts => posts.category==='blog').length)} Blogs
          </span>
          <ButtonGroup
            buttons={['Newest', 'Top', 'Views', 'Oldest']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='questions'>
          {posts
            .filter((post) => post.title.toLowerCase().includes(searchQuery ? searchQuery : ''))
            ?.sort(handleSorting(sortType))
            .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
            .map((post, index) => (
              post.category==='blog' &&(<PostItem key={index} post={post} />)
            ))}
        </div>
        <Pagination
          page={page}
          itemList={posts.filter((post) => post.title.toLowerCase().includes(searchQuery ? searchQuery : ''))}
          itemsPerPage={itemsPerPage}
          handlePaginationChange={handlePaginationChange}
        />
      </div>
    </Fragment>
  );
};

AllBlogsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPosts})(AllBlogsPage);
