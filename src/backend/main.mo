import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import OutCall "http-outcalls/outcall";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";



actor {
  module Subject {
    public type T = {
      #math;
      #science;
      #english;
      #generalKnowledge;
      #wellbeing;
    };

    public func toText(subject : T) : Text {
      switch (subject) {
        case (#math) { "Math" };
        case (#science) { "Science" };
        case (#english) { "English" };
        case (#generalKnowledge) { "General Knowledge" };
        case (#wellbeing) { "Wellbeing" };
      };
    };
  };

  module Role {
    public type T = { #user; #assistant };

    public func toText(role : T) : Text {
      switch (role) {
        case (#user) { "user" };
        case (#assistant) { "assistant" };
      };
    };
  };

  module GameCategory {
    public type T = { #puzzles; #strategy; #arcade };

    public func toText(category : T) : Text {
      switch (category) {
        case (#puzzles) { "Puzzles" };
        case (#strategy) { "Strategy" };
        case (#arcade) { "Arcade" };
      };
    };
  };

  type ChatMessage = {
    role : Role.T;
    content : Text;
    timestamp : Time.Time;
  };

  type Resource = {
    id : Text;
    title : Text;
    description : Text;
    subject : Subject.T;
    url : Text;
  };

  type Page = {
    #home;
    #games;
    #resources;
    #about;
  };

  type GameAnalytics = {
    gameId : Text;
    title : Text;
    category : GameCategory.T;
    clickCount : Nat;
  };

  let sessionMessages = Map.empty<Text, [ChatMessage]>();
  let resources = Map.empty<Text, Resource>();
  let pageVisits = Map.empty<Text, Nat>();
  let gameClicks = Map.empty<Text, GameAnalytics>();

  func initializeResources() {
    let initialResources : [Resource] = [
      { id = "math1"; title = "Khan Academy - Math"; description = "Free math lessons for all ages"; subject = #math; url = "https://www.khanacademy.org/math" },
      { id = "math2"; title = "Math Playground"; description = "Fun math games for kids"; subject = #math; url = "https://www.mathplayground.com" },
      { id = "math3"; title = "Cool Math 4 Kids"; description = "Interactive math lessons"; subject = #math; url = "https://www.coolmath4kids.com" },
      { id = "science1"; title = "NASA Kids' Club"; description = "Space and science resources"; subject = #science; url = "https://www.nasa.gov/kidsclub" },
      { id = "science2"; title = "BrainPOP Science"; description = "Animated science lessons"; subject = #science; url = "https://www.brainpop.com/science" },
      { id = "science3"; title = "National Geographic Kids"; description = "Educational science videos"; subject = #science; url = "https://kids.nationalgeographic.com" },
      { id = "english1"; title = "Storyline Online"; description = "Video stories and reading resources"; subject = #english; url = "https://www.storylineonline.net" },
      { id = "english2"; title = "Fun English Games"; description = "Interactive English learning"; subject = #english; url = "https://www.funenglishgames.com" },
      { id = "english3"; title = "PBS Kids - Reading Games"; description = "Language games and activities"; subject = #english; url = "https://pbskids.org/games/reading" },
      { id = "gk1"; title = "DK Find Out"; description = "General knowledge and facts"; subject = #generalKnowledge; url = "https://www.dkfindout.com" },
      { id = "gk2"; title = "National Geographic Kids - General Knowledge"; description = "Fun facts and games"; subject = #generalKnowledge; url = "https://kids.nationalgeographic.com" },
      { id = "gk3"; title = "Wonderopolis"; description = "Daily wonders and facts"; subject = #generalKnowledge; url = "https://www.wonderopolis.org" },
      { id = "wellbeing1"; title = "GoZen!"; description = "Emotional health resources"; subject = #wellbeing; url = "https://www.gozen.com" },
      { id = "wellbeing2"; title = "Kids Health - Feelings"; description = "Articles on emotional wellbeing"; subject = #wellbeing; url = "https://kidshealth.org/en/kids/feelings/" },
      { id = "wellbeing3"; title = "Calm Kids"; description = "Mindfulness and relaxation resources"; subject = #wellbeing; url = "https://www.calm.com/kids" },
    ];

    for (resource in initialResources.values()) {
      resources.add(resource.id, resource);
    };
  };

  initializeResources();

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func sendMessageToAI(sessionId : Text, message : Text) : async Text {
    let url = "https://api.openai.com/v1/chat/completions";
    let apiKey = "Bearer YOUR_OPENAI_API_KEY";
    let headers = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = apiKey },
    ];

    let body = "{ \"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"system\", \"content\": \"You are a friendly and encouraging tutor...\"}, {\"role\": \"user\", \"content\": \"" # message # "\"} ]}";

    let response = await OutCall.httpPostRequest(url, headers, body, transform);

    let userMessage : ChatMessage = {
      role = #user;
      content = message;
      timestamp = Time.now();
    };

    let assistantMessage : ChatMessage = {
      role = #assistant;
      content = response;
      timestamp = Time.now();
    };

    let existingMessages = switch (sessionMessages.get(sessionId)) {
      case (null) { [] };
      case (?msgs) { msgs };
    };

    let allMessages = existingMessages.concat([userMessage, assistantMessage]);
    sessionMessages.add(sessionId, allMessages);

    response;
  };

  public query ({ caller }) func getSessionMessages(sessionId : Text) : async [ChatMessage] {
    switch (sessionMessages.get(sessionId)) {
      case (null) { [] };
      case (?msgs) { msgs };
    };
  };

  public shared ({ caller }) func createSession(sessionId : Text) : async () {
    if (sessionMessages.containsKey(sessionId)) {
      Runtime.trap("Session already exists");
    };
    sessionMessages.add(sessionId, []);
  };

  public query ({ caller }) func getAllResources() : async [Resource] {
    resources.values().toArray();
  };

  public query ({ caller }) func getResourcesBySubject(subject : Subject.T) : async [Resource] {
    resources.values().toArray().filter(
      func(resource) {
        resource.subject == subject;
      }
    );
  };

  public shared ({ caller }) func recordPageVisit(page : Page) : async () {
    let key = switch (page) {
      case (#home) { "home" };
      case (#games) { "games" };
      case (#resources) { "resources" };
      case (#about) { "about" };
    };

    let currentCount = switch (pageVisits.get(key)) {
      case (null) { 0 };
      case (?count) { count };
    };

    pageVisits.add(key, currentCount + 1);
  };

  public shared ({ caller }) func recordGameClick(gameId : Text, title : Text, category : GameCategory.T) : async () {
    switch (gameClicks.get(gameId)) {
      case (null) {
        let newEntry : GameAnalytics = {
          gameId;
          title;
          category;
          clickCount = 1;
        };
        gameClicks.add(gameId, newEntry);
      };
      case (?entry) {
        let updatedEntry : GameAnalytics = {
          gameId = entry.gameId;
          title = entry.title;
          category = entry.category;
          clickCount = entry.clickCount + 1;
        };
        gameClicks.add(gameId, updatedEntry);
      };
    };
  };

  public query ({ caller }) func getPageVisits() : async [(Text, Nat)] {
    pageVisits.toArray();
  };

  public query ({ caller }) func getGameAnalytics() : async [GameAnalytics] {
    gameClicks.values().toArray();
  };

  public query ({ caller }) func getTotalSiteVisits() : async Nat {
    var total = 0;
    for (count in pageVisits.values()) {
      total += count;
    };
    total;
  };

  public query ({ caller }) func getTotalGameClicks() : async Nat {
    var total = 0;
    for (entry in gameClicks.values()) {
      total += entry.clickCount;
    };
    total;
  };

  public query ({ caller }) func getTopGames(limit : Nat) : async [GameAnalytics] {
    let gamesArray = gameClicks.values().toArray();

    let sorted = gamesArray.sort(
      func(a, b) {
        if (a.clickCount > b.clickCount) { #less } else if (a.clickCount < b.clickCount) { #greater } else { #equal };
      }
    );

    let actualLimit = if (limit > sorted.size()) { sorted.size() } else { limit };
    Array.tabulate<GameAnalytics>(actualLimit, func(i) { sorted[i] });
  };
};
