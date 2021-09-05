const changeVote = (votes, operator) => {
  switch (operator) {
    case '+': 
      return votes += 1;
    case '-': 
      return votes -= 1;
    default:
      return votes;
  }
}

export default changeVote;