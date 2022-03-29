import lambdaTester from "lambda-tester";
import { expect } from "chai";
import { find, create } from "../app/handler";
import * as tasksMock from "./tasks.mock";
import TaskService from "../app/service/tasks";
import sinon from "sinon";

describe("Find [GET]", () => {
  it("success", () => {
    const s = sinon.mock(TaskService);
    s.expects("find").resolves(tasksMock.find);
    return lambdaTester(find)
      .event({})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.message).to.equal("success");
        s.restore();
      });
  });
});

describe("Create [POST]", () => {
  it("success", () => {
    const s = sinon.mock(TaskService);
    s.expects("create").resolves(tasksMock.create);
    return lambdaTester(create)
      .event({
        body: JSON.stringify({
          title: "title",
          description: "description",
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });
});
