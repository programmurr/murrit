import { format } from 'date-fns';

const testPostData = [
  {
    author: "poster1",
    time: format(new Date(2021, 7, 19, 9), 'yyyy-MM-dd:HH:mm:ss'),
    board: 'general',
    title: 'Post Title 1',
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    votes: 5,
    comments: [
      {
        author: "commenter1",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        time: format(new Date(2021, 7, 19, 10), 'yyyy-MM-dd:HH:mm:ss'),
        votes: 0,
        comments: []
      }
    ]
  },
  {
    author: "poster2",
    time: format(new Date(2021, 7, 19, 15), 'yyyy-MM-dd:HH:mm:ss'),
    board: 'general',
    title: 'Post Title 2',
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    votes: 2,
    comments: []
  },
  {
    author: "poster3",
    time: format(new Date(2021, 7, 18, 20), 'yyyy-MM-dd:HH:mm:ss'),
    board: 'general',
    title: 'Post Title 3',
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    votes: 0,
    comments: [
      {
        author: "commenter2",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        time: format(new Date(2021, 7, 18, 21), 'yyyy-MM-dd:HH:mm:ss'),
        votes: 0,
        comments: [
          {
            author: "commenter3",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            time: format(new Date(2021, 7, 18, 22), 'yyyy-MM-dd:HH:mm:ss'),
            votes: 0,
            comments: []
          }
        ]
      },
      
    ]
  }

]

export default testPostData;