const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#4f6522",
        color: "white",
        width: "100%",
        height: 75,
        flex: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <a href="/">
        <img
          className="logo"
          src="/logo.png"
          height={40}
          style={{ marginLeft: 10, marginRight: 20 }}
        />
      </a>
      <h3
        style={{ fontWeight: "bold", fontSize: "1.17em" }}
        className="show-wide"
      >
        ארזים | TAU Factor
      </h3>
      <a
        href="https://github.com/arazimproject/tau-factor"
        className="link show-wide"
      >
        <i
          className="fa-brands fa-github"
          style={{ marginInlineStart: 10, fontSize: 24, color: "white" }}
        />
      </a>
      <a
        href="https://chromewebstore.google.com/detail/tau-factor/ocnjdmhgcphlaeaoneikpobbjlkdpiib"
        className="link show-wide"
        target="_blank"
      >
        <i
          className="fa-brands fa-chrome"
          style={{ marginInlineStart: 10, fontSize: 24, color: "white" }}
        />
      </a>
    </div>
  )
}

export default Header
