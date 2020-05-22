let db = {
  users: [
    {
      userId: "9oouIaqmftTx5zQfvV06YFU2mlW2",
      email: "user02@gmail.com",
      createdAt: "2020-05-19T06:59:01.385Z",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/tutorial-267c7.appspot.com/o/21532705782.png?alt=media",
      handle: "user02"
    }
  ],
  screams: [
    {
      userHandle: "user",
      body: "this a sample scream",
      createdAt: "",
      likeCount: 5,
      commentCount: 3
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: '9oouIaqmftTx5zQfvV06YFU2mlW2',
    email: 'user02@gmail.com',
    handle: 'user02',
    createdAt: '2020-05-19T06:59:01.385Z',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tutorial-267c7.appspot.com/o/21532705782.png?alt=media',
    bio: '',
    website: 'https://user.com',
    location: 'long an, vn'
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'hh7O5oWfWucVzGbHH2pa'
    },
    {
      userHandle: 'user',
      screamId: '3IOnFoQexRcofs5OhBXO'
    }
  ]
};