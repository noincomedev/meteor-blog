import React from "react";
import ReactMarkdown from "react-markdown";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4]
  },
  avatar: {
    height: 200,
    width: 200,
    border: `${theme.spacing.unit / 2}px ${theme.palette.common.white} solid`,
    alignSelf: "center"
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center"
  },
  quoteText: {
    color: theme.palette.grey[500]
  },
  text: {
    color: theme.palette.custom.text
  },
  textContainer: {
    paddingLeft: theme.spacing.unit * 2,
    alignSelf: "center"
  }
});

const markdowText = `
  # Hi👋, this is Diego👨‍💻.
  I am self-taught👨‍🎓 web developer🖥️ from Santiago, Chile🇨🇱.   
  I want to ship📦 awesome profitable📈 products and make a living of it!💰🤑.
   I like to write⌨️ code and learn new things every day.  
    
  I created this blog from scratch🚀 for educational purposes👨‍🏫. I wanted to learn how to ship📦 
  modern apps📱. So I decided to do it with my favorite😍 tools, #meteor☄️, #apollo and #react⚛️! 
    
  Follow me on [Twitter🐦](https://www.twitter.com/noincomedev) and [Instagram📷](https://www.instagram.com/noincomedev) to keep you updated!
`;

const ProfileBanner = ({ classes }) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={4} className={classes.avatarContainer}>
      <Avatar
        alt="Me"
        src="https://lh3.googleusercontent.com/qZ_aVAL0KMWrPURbkDA-UVW_moNXJuIdUp4ERbVRR2t7lEdiSAAXQTAnKlpu7vvWPevR0-uGZfVURo9fxjZ-voYKKefIMXjhZoFiU4T4FHquLKjj3Lt202yBLZuMEAH5446PIzaLW9aD3EWCgrMnwiYMCbnQ2cApj9Q9m-UEFJYnc3CntksaFTGXfynzNVdybeTMthdqzSoOTg1eF11tZPAt1IlQ4p20-9npv5-r0Jw1dopWmE7r8pfXyzI4zEoRHG0CRNcE2_RrHu_Mq4PNQWBEXkybL49usqsKhRsPA34yKCTPG3MZXyvFp6tkVX2zaZey9r0ZgW0IaEHhQU2IDxmRHUd2Db5aNv44PTvqL6v_Fzkqfh0lspBK185qhWAxdXKAo6ditmuTaML--mh2bSeHxxvMeAlNmXJdY4QbEq_tBQpHuGMHtqZTiLAdUO-ePe97bgKrA0HSvECJL8aDudPXxbPtSClFDo5rTPFNFIvEVCAS0WJk5BGGIuysmsKpHVTk3l04j5TwT2U61EscwP_ND2tYjW4LqLSXxRUXJKloJave_m5exaUeXijZ-etxk71fkNVCFO5HWoUozdW1xLh_6rb8lB1N=w960-h1280-no"
        className={classes.avatar}
      />
    </Grid>
    <Grid item xs={8} sm={6} className={classes.textContainer}>
      <ReactMarkdown className={classes.text} source={markdowText} />
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(ProfileBanner);
