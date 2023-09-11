global.moment = require("moment-timezone");
const { performWebRequest, formatTime } = require("../../../../modules/default/utils");

const nodeVersion = process.version.match(/^v(\d+)\.*/)[1];

describe("Default modules utils tests", () => {
	describe("performWebRequest", () => {
		if (nodeVersion > 18) {
			const locationHost = "localhost:8080";
			const locationProtocol = "http";

			let fetchResponse;
			let fetchMock;
			let urlToCall;

			beforeEach(() => {
				fetchResponse = new Response();
				global.fetch = jest.fn(() => Promise.resolve(fetchResponse));
				fetchMock = global.fetch;
			});

			describe("When using cors proxy", () => {
				Object.defineProperty(global, "location", {
					value: {
						host: locationHost,
						protocol: locationProtocol
					}
				});

				test("Calls correct URL once", async () => {
					urlToCall = "http://www.test.com/path?param1=value1";

					await performWebRequest(urlToCall, "json", true);

					expect(fetchMock.mock.calls.length).toBe(1);
					expect(fetchMock.mock.calls[0][0]).toBe(`${locationProtocol}//${locationHost}/cors?url=${urlToCall}`);
				});

				test("Sends correct headers", async () => {
					urlToCall = "http://www.test.com/path?param1=value1";

					const headers = [
						{ name: "header1", value: "value1" },
						{ name: "header2", value: "value2" }
					];

					await performWebRequest(urlToCall, "json", true, headers);

					expect(fetchMock.mock.calls.length).toBe(1);
					expect(fetchMock.mock.calls[0][0]).toBe(`${locationProtocol}//${locationHost}/cors?sendheaders=header1:value1,header2:value2&url=${urlToCall}`);
				});
			});

			describe("When not using cors proxy", () => {
				test("Calls correct URL once", async () => {
					urlToCall = "http://www.test.com/path?param1=value1";

					await performWebRequest(urlToCall);

					expect(fetchMock.mock.calls.length).toBe(1);
					expect(fetchMock.mock.calls[0][0]).toBe(urlToCall);
				});

				test("Sends correct headers", async () => {
					urlToCall = "http://www.test.com/path?param1=value1";
					const headers = [
						{ name: "header1", value: "value1" },
						{ name: "header2", value: "value2" }
					];

					await performWebRequest(urlToCall, "json", false, headers);

					const expectedHeaders = { headers: { header1: "value1", header2: "value2" } };
					expect(fetchMock.mock.calls.length).toBe(1);
					expect(fetchMock.mock.calls[0][1]).toStrictEqual(expectedHeaders);
				});
			});

			describe("When receiving json format", () => {
				test("Returns undefined when no data is received", async () => {
					urlToCall = "www.test.com";

					const response = await performWebRequest(urlToCall);

					expect(response).toBe(undefined);
				});

				test("Returns object when data is received", async () => {
					urlToCall = "www.test.com";
					fetchResponse = new Response('{"body": "some content"}');

					const response = await performWebRequest(urlToCall);

					expect(response.body).toBe("some content");
				});

				test("Returns expected headers when data is received", async () => {
					urlToCall = "www.test.com";
					fetchResponse = new Response('{"body": "some content"}', { headers: { header1: "value1", header2: "value2" } });

					const response = await performWebRequest(urlToCall, "json", false, undefined, ["header1"]);

					expect(response.headers.length).toBe(1);
					expect(response.headers[0].name).toBe("header1");
					expect(response.headers[0].value).toBe("value1");
				});
			});
		} else {
			test("Always ok, need one test", () => {});
		}
	});

	describe("formatTime", () => {
		const time = new Date();

		beforeEach(async () => {
			time.setHours(13, 13);
		});

		it("should convert correctly according to the config", () => {
			expect(
				formatTime(
					{
						timeFormat: 24
					},
					time
				)
			).toBe("13:13");
			expect(
				formatTime(
					{
						showPeriod: true,
						showPeriodUpper: true,
						timeFormat: 12
					},
					time
				)
			).toBe("1:13 PM");
			expect(
				formatTime(
					{
						showPeriod: true,
						showPeriodUpper: false,
						timeFormat: 12
					},
					time
				)
			).toBe("1:13 pm");
			expect(
				formatTime(
					{
						showPeriod: false,
						timeFormat: 12
					},
					time
				)
			).toBe("1:13");
		});

		it("should convert correctly into another timezone", () => {
			expect(
				formatTime(
					{
						timeFormat: 24,
						timezone: "America/Toronto"
					},
					time
				)
			).toBe("07:13");
		});
	});
});
