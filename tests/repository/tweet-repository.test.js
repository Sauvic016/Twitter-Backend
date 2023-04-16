import TweetRepository from "../../src/repository/tweet-repository";
import Tweet from "../../src/models/tweet.js";

jest.mock("../../src/models/tweet.js");

describe("Create tweet tests", () => {
  test("should create a new tweet and return it", async () => {
    const data = {
      content: "Testing Tweet",
    };

    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      return { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12" };
    });

    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data);

    expect(spy).toHaveBeenCalled();
    expect(tweet.content).toBe(data.content);
    expect(tweet.createdAt).toBeDefined();
  });

  test("should not create a tweet and throw exception", async () => {
    const data = {
      content: "Testing Tweet",
    };

    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      throw new Error("Something went wrong");
    });

    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Something went wrong");
    });
  });
});

describe("Get all tweet tests", () => {
  test("testing limit for get all", async () => {
    const data = {
      content: "Testing Tweet",
    };
    const tweetsArray = [
      { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12" },
      { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12" },
      { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12" },
    ];
    const findResponse = { tweetsArray };
    findResponse.skip = jest.fn((offset) => findResponse);
    findResponse.limit = jest.fn((limit) => findResponse.tweetsArray.slice(0, limit));

    const spy = jest.spyOn(Tweet, "find").mockImplementation(() => {
      return findResponse;
    });
    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.getAll(0, 2);
    expect(spy).toHaveBeenCalled();
    expect(tweets).toHaveLength(2);
  });

  test("should not return tweets and throw exception", async () => {
    const spy = jest.spyOn(Tweet, "find").mockImplementation(() => {
      throw new Error("Something went wrong");
    });

    const tweetRepository = new TweetRepository();

    const tweet = await tweetRepository.getAll(0, 2).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Something went wrong");
    });
    expect(spy).toHaveBeenCalled();
  });
});

describe("test getWithComments", () => {
  test("should return tweet for the correct id", async () => {
    const data = {
      content: "Testing Tweet",
    };

    const tweetData = { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12", id: 2 };
    const findByIdResponse = tweetData;
    findByIdResponse.populate = jest.fn((obj) => tweetData);
    findByIdResponse.lean = jest.fn(() => tweetData);

    const spy = jest.spyOn(Tweet, "findById").mockImplementation(() => {
      return findByIdResponse;
    });

    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.getWithComments(2);

    expect(spy).toHaveBeenCalled();
    expect(tweets.content).toBe("Testing Tweet");
  });

  test("should not return tweets and throw error", async () => {
    const spy = jest.spyOn(Tweet, "findById").mockImplementation(() => {
      throw new Error("TweetId not found");
    });

    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.getWithComments(2).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("TweetId not found");
    });
    expect(spy).toHaveBeenCalled();
  });
});
describe("find tweet tests", () => {
  test("should return tweet for the correct id", async () => {
    const data = {
      content: "Testing Tweet",
    };

    const tweetData = { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12", id: 2 };
    const findByIdResponse = tweetData;
    findByIdResponse.populate = jest.fn((obj) => tweetData);

    const spy = jest.spyOn(Tweet, "findById").mockImplementation(() => {
      return findByIdResponse;
    });

    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.find(2);
    console.log(tweets);
    expect(spy).toHaveBeenCalled();
    expect(tweets.content).toBe("Testing Tweet");
  });

  test("should not return tweets and throw error", async () => {
    const spy = jest.spyOn(Tweet, "findById").mockImplementation(() => {
      throw new Error("TweetId not found");
    });

    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.find(2).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("TweetId not found");
    });
    expect(spy).toHaveBeenCalled();
  });
});
