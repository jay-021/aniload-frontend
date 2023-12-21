import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";

function PostCard({ post, handleDelete }) {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${post.id}`).then((response) => {
      setAnime(response.data.data);
    });
  }, [post.id]);

  return (
    <Card key={post.id} style={{ marginBottom: "10px", flexGrow: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
        {anime && (
          <div>
            <Typography variant="h6" component="div">
              Anime title: {anime.title}
            </Typography>
            <img src={anime.images?.jpg.large_image_url} alt={anime.title} />
          </div>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(post._id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}

export default PostCard;
