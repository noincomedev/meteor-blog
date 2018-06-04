import React from "react";
import ReactMarkdown from "react-markdown";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const imgUrl =
  "https://lh3.googleusercontent.com/LBBaynhWIeEEGgQ7r4Pu_bjZWxRGQU1Dlj0UW5Krl3sxVSbYRXdZzf120FAHhQ0glEBRATGIOz-vGlMsQdrZr7roArq4CcVwyyyeGFfEOL8CpoCzu-Lqp8vmg9ffNdbOaoSVrCDZ3-CEcKpCoUgQr4RQUUWunhzx85EAFdPBHf7xXAaCmNmXhJFRX466vArJTpxonvnUhirzE9LZmPf2siLaG1U8SRy6mGzaIKaEqLb9kYJsVjGHmUChTrzHmG7xyUpsaQFA-OxIhMYhFNPgaPHwvPXv17eJ-TO1KU2LLwgBsKyzguv-IC00UdQ8AXL9Zm9qjRyowVbAmG1rjE4BZhAtyHer2Ex-6gvK9WuoYEBJaLMq8nVkzTwif2kEKyT0SCEHbrZldgTFemCRsSYCNo_LIkOlBoUvsUutiM9hto4F0G_Pa3EftoNu6Kri376Y1G0DZnlFBpzo6K8WlCy77vIDpt7bR-pGdU1YYEj3aBW5BcIj1Wrrues_G9Evz3hkL1MD3wqAdUSWmqXdUgNDAVUw5IovVzeTTp07exQs1uLFrGjvjBJk9AKF8f52WLskRvsJmQKssIVgMcYrXZkibFHte3GoVINm=w475-h349-no-tmp.jpg";

const markdown = `
__*I am self-taught👨‍🎓 web developer🖥️ wannabe #indiemaker from Santiago, Chile🇨🇱.*__  
I built this blog from scratch🚀 with educational purposes👨‍🏫 to learn how to
ship modern/2018 apps📱.
`;

const styles = theme => ({
  aboutSection: {
    position: "relative",
    backgroundColor: "red",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    boxShadow: `inset 0 0 0 2000px rgba(255,0,150,0.3)`,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px ${theme.spacing.unit * 2}px`
  },
  display2: {
    textShadow: `
    1px 1px 0 #fff,
    -1px -1px 0 #fff,  
    1px -1px 0 #fff,
    -1px  1px 0 #fff,
    1px  1px 0 #fff
    `
  },
  markdown: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: theme.palette.custom.text,
    background: "rgba(41, 28, 62, 0.65)",
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  subheading: {
    position: "absolute",
    right: 0,
    bottom: 0
  }
});

const AboutPage = ({ classes }) => (
  <section className={classes.aboutSection}>
    <Typography
      align="center"
      variant="display2"
      color="primary"
      classes={{ display2: classes.display2 }}
    >
      Hello👋! <br /> This is Diego👨‍💻...
    </Typography>
    <ReactMarkdown className={classes.markdown} source={markdown} />
    <Typography
      align="center"
      variant="subheading"
      color="textSecondary"
      classes={{ subheading: classes.subheading }}
    >
      Me @ Chatuchak Weekend Market, Bangkok, Thailand.
    </Typography>
  </section>
);

export default withStyles(styles, { withTheme: true })(AboutPage);
