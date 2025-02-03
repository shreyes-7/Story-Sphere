import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  return (
    <div className="posts">
      <Post
        img="https://burst.shopifycdn.com/photos/icy-summit-of-a-mountain-on-a-frosty-night.jpg?width=1000&format=pjpg&exif=0&iptc=0"
        postId="1"
        title="The Majestic Mountain"
        category="Nature"
        description="A beautiful mountain peak covered with snow, reaching for the sky."
      />
      <Post
        img="https://experiencemyindia.com/wp-content/uploads/2024/09/Kedarnath-1.jpg"
        postId="2"
        title="Sacred Kedarnath"
        category="Travel"
        description="Explore the mystic beauty and spirituality of Kedarnath Temple in the Himalayas."
      />
      <Post
        img="https://images4.alphacoders.com/106/thumb-1920-106826.jpg"
        postId="3"
        title="Starry Night Sky"
        category="Astronomy"
        description="The sky at night filled with stars, constellations, and the moon's glow."
      />
      <Post
        img="https://w0.peakpx.com/wallpaper/322/669/HD-wallpaper-beach-sunset-beach-sunset-nature-clouds.jpg"
        postId="4"
        title="Beach Sunset"
        category="Nature"
        description="A beautiful view of the sunset over the ocean, with colors painting the sky."
      />
      <Post
        img="https://www.pixelstalk.net/wp-content/uploads/2015/07/Awesome-fireworks-on-paris-city-Eiffel-Tower-download-best-desktop-hd-widescreen-wallpapers-for-free.jpg"
        postId="5"
        title="Eiffel Tower Fireworks"
        category="Events"
        description="A spectacular view of fireworks bursting around the Eiffel Tower in Paris."
      />
    </div>
  );
}
