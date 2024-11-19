import express from "express";

const posts = [
    {
      id: 1,
      description: "Uma foto teste",
      image: "https://placecats.com/millie/300/150"
    },
    {
      id: 2,
      description: "Um gato fofo",
      image: "https://placecats.com/millie/300/150"
    },
    {
      id: 3,
      description: "Gato preto e branco",
      image: "https://placecats.com/millie/300/150"
    },
    {
      id: 4,
      description: "Gato brincando com um novelo de lã",
      image: "https://placecats.com/millie/300/150"
    },
    {
      id: 5,
      description: "Gato olhando pela janela",
      image: "https://placecats.com/millie/300/150"
    },
    {
      id: 6,
      description: "Gato dormindo",
      image: "https://placecats.com/millie/300/150"
    }
  ];

function searchPostById(id) {
    return posts.find((post) => {
        return post.id === Number(id);
    });
};

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello World!!");
});

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

app.get('/posts/:id', (req, res) => {
    const post = searchPostById(req.params.id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).send("POST NOT FOUND");
    };
});

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
