import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import testPostData from '../../utils/posts';

function ViewPost(props) {
  let { postid } = useParams();

  return (
    <div>Post ID: {postid}</div>
  );
}

export default ViewPost;