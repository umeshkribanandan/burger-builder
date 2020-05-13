import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
    });
  });

  it("should store the token uplon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            idToken: "token",
            localId: "userId",
          },
        }
      )
    ).toEqual({
      token: "token",
      userId: "userId",
      loading: false,
      error: null,
    });
  });
});
