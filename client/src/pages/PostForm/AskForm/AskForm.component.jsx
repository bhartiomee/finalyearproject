import React, {Fragment, useState, useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addPost} from '../../../redux/posts/posts.actions';
import MarkdownEditor from '../../../components/MarkdownEditor/MarkdownEditor.component';

import './AskForm.styles.scss';

const AskForm = ({addPost}) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tagname: '',
  });

  const markdownEditorRef = useRef(null);

  const {title, body, tagname,category} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    await addPost({title, body, tagname,category});
    setFormData({
      title: '',
      body: '',
      tagname: '',
      category:''
    });
    markdownEditorRef.current.cleanEditorState();
  };
  console.log({...formData})

  const updateConvertedContent = (htmlConvertedContent) => {
    setFormData({...formData, body: htmlConvertedContent});
  };

  return (
    <Fragment>
      <form>
        <div className='question-form p16 s-card'>
          <div className='question-layout'>
            <div className='title-grid'>
              <label className='form-label s-label'>
                Title
                <p className='title-desc fw-normal fs-caption'>
                  Be specific and imagine you’re asking a question to another
                  person
                </p>
              </label>
              <input
                className='title-input s-input'
                type='text'
                name='title'
                value={title}
                onChange={(e) => onChange(e)}
                id='title'
                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                required
              />
            </div>
            <div className='body-grid'>
              <label className='form-label s-label fc-black-800'>
                Body
                <p className='body-desc fw-normal fs-caption fc-black-800'>
                  Include all the information someone would need to answer your
                  question
                </p>
              </label>
              <div className='s-textarea rich-text-editor-container'>
                <MarkdownEditor
                  ref={markdownEditorRef}
                  onChange={updateConvertedContent}
                />
              </div>
            </div>
            <div className='tag-grid'>
              <label className='form-label s-label'>
                Tag Name
                <p className='tag-desc fw-normal fs-caption'>
                  Add up to 5 tags to describe what your question is about
                </p>
              </label>
              <input
                className='tag-input s-input'
                type='text'
                name='tagname'
                value={tagname}
                onChange={(e) => onChange(e)}
                id='tagname'
                placeholder='e.g. (ajax django string)'
                required
              />
            </div>
            <div className='tag-grid'>
              <label className='form-label s-label' for="category">
                Category
               <select name='category' onChange={(e) => onChange(e)}>
                <option value='question'>Questions</option>
                <option value='blog'>Blog</option>
               </select>
              </label>
            </div>
          </div>
        </div>
        <div className='post-button mt32'>
          <button onClick={onSubmit}
            className='s-btn s-btn__primary'
            id='submit-button'
            name='submit-button'
          >
            Post your question
          </button>
        </div>
      </form>
    </Fragment>
  );
};

AskForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, {addPost})(AskForm);
