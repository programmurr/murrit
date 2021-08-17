import { render, screen } from '@testing-library/react';
import testPostData from '../utils/posts';
import Post from '../components/post/Post';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Post.js', () => {
  test('renders comment count of 1 correctly', () => {
    const data = testPostData[0];
    render(<Router><Post data={data}/></Router>);
    const commentInfo = screen.getByText('1 comment');
    expect(commentInfo).toBeInTheDocument();
  });

  test('renders comment count of 0 correctly', () => {
    const data = testPostData[1];
    render(<Router><Post data={data}/></Router>);
    const commentInfo = screen.getByText('No comments');
    expect(commentInfo).toBeInTheDocument();
  });

  test('renders nested comment counts correctly', () => {
    const data = testPostData[2];
    render(<Router><Post data={data}/></Router>);
    const commentInfo = screen.getByText('2 comments');
    expect(commentInfo).toBeInTheDocument();
  });


  test('renders nested comment counts and additional replies correctly', () => {
    const data = testPostData[3];
    render(<Router><Post data={data}/></Router>);
    const commentInfo = screen.getByText('4 comments');
    expect(commentInfo).toBeInTheDocument();
  });
})
