import qs from "qs";
import request from "../utils/request";

export function getProfile() {
  return request({
    url: "/getProfile",
    method: "get",
  });
}

export function updateProfile(data) {
  const options = qs.stringify(data);

  return request({
    url: "/updateProfile",
    method: "post",
    data: options,
  });
}

export function getWinners(data) {
  const options = qs.stringify(data);

  return request({
    url: "/getWinners?" + options,
    method: "get",
  });
}

export function searchWinners(data) {
  const options = qs.stringify(data);

  return request({
    url: "/searchWinner",
    method: "post",
    data: options,
  });
}

export function getChecks() {
  return request({
    url: "/getCodes",
    method: "get",
  });
}

export function getPrizes() {
  return request({
    url: "/getPrizes",
    method: "get",
  });
}

export function logOut() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function deleteProfile() {
  return request({
    url: "/deleteProfile",
    method: "post",
  });
}

export function sendFeedback(data) {
  const options = qs.stringify(data);

  return request({
    url: "/sendFeedback",
    method: "post",
    data: options,
  });
}

export function uploadImage(data) {
  const options = qs.stringify(data);

  return request({
    url: "/cropImage",
    method: "post",
    data: options,
  });
}
