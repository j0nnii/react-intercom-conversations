import React from "react";
import { mount } from "enzyme";
import Root from "Root";
import Message from "components/Message";

let wrapped;

beforeEach(() => {
  const initialState = {
    ui: {
      tab: "conversations"
    },
    conversations: {
      conversations: [],
      nextPage: 1
    },
    users: {
      users: [],
      companies: []
    }
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <Message
        userId="testuser"
        image="https://via.placeholder.com/350x150"
        date="June 12th"
        message="Test"
        messageId="1"
      />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("creates one element with comment class", () => {
  expect(wrapped.find(".comment").length).toEqual(1);
});

it("shows the text for each comment", () => {
  expect(wrapped.render().text()).toContain("Test");
});
