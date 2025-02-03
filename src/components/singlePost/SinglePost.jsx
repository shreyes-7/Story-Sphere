import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./singlePost.css";

export default function SinglePost() {
  const [likeCount, setLikeCount] = useState(0);
  const { postId } = useParams(); // Get the postId from the URL

  // Post data for all 5 posts
  const postsData = {
    1: {
      title: "The Majestic Mountain",
      description:
        "Mountains have always symbolized strength, mystery, and serenity, rising tall against the skyline and guarding the earth's beauty with unspoken power. Hiking through their rugged terrain offers breathtaking vistas, with snow-capped peaks towering high above the valleys, creating both a physical and spiritual journey. The air in the mountains is crisper, cleaner, and filled with the earthy scent of pine trees, while the sound of rustling leaves and the distant roar of a river form a symphony of tranquility. With every step, the world below fades, drawing you closer to the heavens, making the journey about more than just reaching the summit—it's about experiencing quiet moments along the way, like the cool mountain breeze and the soft whispers of nature. Reaching the peak brings a deep sense of accomplishment, offering panoramic views of forests, lakes, and valleys, all painted in vibrant hues by the changing sun. The mountains provide more than just a challenge—they offer a place for reflection, growth, and a deeper connection to the world, answering the call of those who seek adventure, solitude, or simply the beauty of nature.",
      category: "Nature",
      image: "https://burst.shopifycdn.com/photos/icy-summit-of-a-mountain-on-a-frosty-night.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    },
    2: {
      title: "Sacred Kedarnath",
      description:
        "Kedarnath, nestled in the breathtaking Garhwal region of Uttarakhand, is not only one of the holiest pilgrimage destinations in India but also a place where spirituality and nature intertwine to create a profound and transformative experience. Located at an altitude of 3,583 meters, the journey to Kedarnath is a test of both physical endurance and mental resilience, as pilgrims embark on a challenging trek through rugged terrains, steep slopes, and dense forests, with the majestic peaks of the Himalayas as their constant companions. The trek, which begins at Gaurikund, is far more than just a physical challenge—it is a spiritual journey that offers moments of deep reflection and connection with the divine, as well as with nature in its purest form. Along the way, the air grows thinner, the landscape more rugged, and the experience becomes increasingly meditative, with each step symbolizing a step closer to inner peace and spiritual awakening. The Kedarnath Temple, built in the 8th century by the great sage Adi Shankaracharya, stands as a testament to India’s rich spiritual and architectural heritage, offering devotees a place to seek blessings, solace, and healing. Once at the temple, the serene surroundings, with towering snow-capped peaks, lush meadows, and crystal-clear rivers, create a sacred atmosphere that transcends the ordinary. The temple's aura, combined with the sound of chanting prayers and the devotion of fellow pilgrims, offers a deep sense of peace and connection to the divine, making it a truly unique experience. Kedarnath is not just a destination; it is a spiritual haven that rejuvenates the soul, offering a harmonious blend of adventure, devotion, and reflection, and leaving an indelible mark on the hearts of those who embark on its sacred journey. Whether seeking solace, adventure, or a deeper connection to faith, Kedarnath is a place that speaks to the heart, body, and spirit in ways that are both profound and unforgettable.",
      category: "Travel",
      image: "https://experiencemyindia.com/wp-content/uploads/2024/09/Kedarnath-1.jpg",
    },
    3: {
      title: "Starry Night Sky",
      description:
        "A starry night sky is a breathtaking spectacle that captivates the imagination and stirs a sense of wonder in all who gaze upon it. As the sun dips below the horizon and darkness envelops the world, the vast expanse above comes alive with countless twinkling stars, each one a distant sun in the vast universe. The sight of the night sky, often dotted with constellations and the soft glow of the Milky Way, evokes feelings of awe and humility, reminding us of our small place in the cosmos. The cool night air, the stillness of the world around you, and the brilliant display above create a serene and peaceful atmosphere, perfect for stargazing, reflection, and contemplation. Whether you're lying on a grassy field, hiking up a mountain, or simply looking up from your backyard, the sight of the night sky has a magical quality that connects us to the mysteries of the universe, sparking curiosity about the stars, planets, and the infinite space that stretches beyond. It’s a moment of tranquility and beauty that invites us to dream, wonder, and reconnect with the timeless rhythm of the cosmos. The starry night sky is more than just a celestial event; it is a reminder of the vastness of the universe, the power of nature, and the infinite possibilities that lie beyond the world we know.",
      category: "Astronomy",
      image: "https://images4.alphacoders.com/106/thumb-1920-106826.jpg",
    },
    4: {
      title: "Beach Sunset",
      description:
        "A beach sunset is a mesmerizing display of nature’s beauty, where the tranquil rhythm of the waves meets the breathtaking hues of the setting sun, creating a moment of pure serenity and awe. As the sun begins its descent, the sky transforms into a canvas of warm oranges, pinks, purples, and reds, casting a golden glow over the calm waters. The gentle sound of the waves crashing on the shore, combined with the cool ocean breeze, adds to the peaceful atmosphere, making it the perfect time for reflection and relaxation. Whether you’re walking along the shoreline, sitting on the sand, or simply gazing out at the horizon, a beach sunset offers a moment of escape from the hustle and bustle of everyday life, allowing you to connect with the natural world in a deeply soothing way. The beauty of the sunset, with its ever-changing colors and the way it paints the sky and sea in perfect harmony, serves as a reminder of the simple yet profound joys that nature provides, filling the heart with a sense of gratitude and peace. As the sun dips below the horizon, leaving behind a soft twilight glow, the beach sunset marks the end of another day, leaving behind memories of a stunning, peaceful moment that lingers long after the last light fades.",
      category: "Nature",
      image: "https://w0.peakpx.com/wallpaper/322/669/HD-wallpaper-beach-sunset-beach-sunset-nature-clouds.jpg",
    },
    5: {
      title: "Eiffel Tower Fireworks",
      description:
        "A beach sunset is a mesmerizing display of nature’s beauty, where the tranquil rhythm of the waves meets the breathtaking hues of the setting sun, creating a moment of pure serenity and awe. As the sun begins its descent, the sky transforms into a canvas of warm oranges, pinks, purples, and reds, casting a golden glow over the calm waters. The gentle sound of the waves crashing on the shore, combined with the cool ocean breeze, adds to the peaceful atmosphere, making it the perfect time for reflection and relaxation. Whether you’re walking along the shoreline, sitting on the sand, or simply gazing out at the horizon, a beach sunset offers a moment of escape from the hustle and bustle of everyday life, allowing you to connect with the natural world in a deeply soothing way. The beauty of the sunset, with its ever-changing colors and the way it paints the sky and sea in perfect harmony, serves as a reminder of the simple yet profound joys that nature provides, filling the heart with a sense of gratitude and peace. As the sun dips below the horizon, leaving behind a soft twilight glow, the beach sunset marks the end of another day, leaving behind memories of a stunning, peaceful moment that lingers long after the last light fades.",
      category: "Events",
      image: "https://www.pixelstalk.net/wp-content/uploads/2015/07/Awesome-fireworks-on-paris-city-Eiffel-Tower-download-best-desktop-hd-widescreen-wallpapers-for-free.jpg",
    },
  };

  // Get the post details based on the postId
  const post = postsData[postId];

  // This useEffect is now always called before the early return
  useEffect(() => {
    if (postId) {
      console.log("Post ID:", postId); // Optional: For debugging
    }
  }, [postId]);

  // If post does not exist, return early
  if (!post) {
    return <div>Post not found</div>;
  }

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={post.image} alt={post.title} />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <a href="/posts?username=Shreyes" className="link">
                Shreyes Jaiswal
              </a>
            </b>
          </span>
          <span>1 day ago</span>
        </div>
        <div className="singlePostDesc">
          <p>{post.description}</p> {/* Display the description dynamically */}
          <button className="likeButton" onClick={handleLike}>
            Like <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
