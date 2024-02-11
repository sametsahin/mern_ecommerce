const getToken = (getState) => {
  return getState?.users?.userAuth?.userInfo?.token;
};

const configFile = (token, ml) => {
  const multi = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const df = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return ml === "ml" ? multi : df;
};

export { configFile, getToken };
