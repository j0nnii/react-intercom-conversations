import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import App from "components/App";

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(
    "/conversations?type=admin&admin_id=1881793&order=created_at&sort=desc&display_as=plaintext&per_page=50&page=1",
    {
      status: 200,
      response: {
        pages: {
          page: "1"
        },
        conversations: [
          {
            created_at: "1560441663",
            user: {
              id: "1",
              type: "user"
            },
            conversation_message: {
              body: "test"
            }
          }
        ]
      }
    }
  );
  moxios.stubRequest("/users/1", {
    status: 200,
    response: {
      companies: {
        companies: [{ name: "Test" }]
      }
    }
  });
});

afterEach(() => {
  moxios.uninstall();
});

it("can fetch a list of comments and display them", done => {
  //attempt to render the entire app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // find the interCom key input and type on it
  wrapped
    .find("#intercomKey")
    .simulate("change", { target: { value: "ABCDEFGHIJK" } });

  // find the fetchComments button and click it
  wrapped.find(".fetch-comments").simulate("click");

  // expect to find a list of conversations
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find(".comment").length).toEqual(0);
    done();
  });
});
