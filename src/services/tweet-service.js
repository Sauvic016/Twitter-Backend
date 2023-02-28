import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }
  async create(data) {
    const content = data.content;
    let tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags

    tags = tags.map((tag) => tag.substring(1).toLowerCase());
    let tagSet = new Set(tags);
    tags = Array.from(tagSet);
    const tweet = await this.tweetRepository.create(data);

    let existingHashtags = await this.hashtagRepository.findByName(tags);
    let titleOfPresentTags = existingHashtags.map((tag) => tag.title);

    let newHashtags = tags.filter((tag) => {
      return !titleOfPresentTags.includes(tag);
    });

    newHashtags = newHashtags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });

    await this.hashtagRepository.bulkCreate(newHashtags);

    existingHashtags.forEach((tag) => {
      tag.tweets.push(tweet.id);
      tag.save();
    });

    return tweet;
  }
}

export default TweetService;
