import Principal "mo:base/Principal";

actor {
  public shared query (msg) func greet(name : Text) : async Text {
    return "Hello, " # name # "! Your principal is " # Principal.toText(msg.caller);
  };
};
