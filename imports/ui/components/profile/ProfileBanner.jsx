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
  Few months ago me and my girlfriend arrived home from our 6 months trip to South East Asia.  

  I want to make awesome profitable📈 products while I try to make a living of it!💰🤑.
  I like to write⌨️ code and learn new things every day.  
    
  I built this blog from scratch🚀 with educational purposes👨‍🏫 to learn how to
  code modern apps📱 with
  [#meteor☄️](https://www.noincomedev.me/tags/meteor), 
  [#apollo](https://www.noincomedev.me/tags/apollo) and 
  [#react⚛️](https://www.noincomedev.me/tags/react)!  

  I will use this blog as my "Maker Diary"📕 so I will share any kind of
  content related to startups🚀, software development🖥️, tech🔭, étc.  

  As you might noticed, I am a no income dev! Thats why I am askig for [DONATIONS](https://www.paypal.me/noincomedev/3). 
  Also you can help me with a follow on [Twitter🐦](https://www.twitter.com/noincomedev) and [Instagram📷](https://www.instagram.com/noincomedev).
`;

const ProfileBanner = ({ classes }) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={12} sm={4} className={classes.avatarContainer}>
      <Avatar
        alt="Me"
        src="https://lh3.googleusercontent.com/qZ_aVAL0KMWrPURbkDA-UVW_moNXJuIdUp4ERbVRR2t7lEdiSAAXQTAnKlpu7vvWPevR0-uGZfVURo9fxjZ-voYKKefIMXjhZoFiU4T4FHquLKjj3Lt202yBLZuMEAH5446PIzaLW9aD3EWCgrMnwiYMCbnQ2cApj9Q9m-UEFJYnc3CntksaFTGXfynzNVdybeTMthdqzSoOTg1eF11tZPAt1IlQ4p20-9npv5-r0Jw1dopWmE7r8pfXyzI4zEoRHG0CRNcE2_RrHu_Mq4PNQWBEXkybL49usqsKhRsPA34yKCTPG3MZXyvFp6tkVX2zaZey9r0ZgW0IaEHhQU2IDxmRHUd2Db5aNv44PTvqL6v_Fzkqfh0lspBK185qhWAxdXKAo6ditmuTaML--mh2bSeHxxvMeAlNmXJdY4QbEq_tBQpHuGMHtqZTiLAdUO-ePe97bgKrA0HSvECJL8aDudPXxbPtSClFDo5rTPFNFIvEVCAS0WJk5BGGIuysmsKpHVTk3l04j5TwT2U61EscwP_ND2tYjW4LqLSXxRUXJKloJave_m5exaUeXijZ-etxk71fkNVCFO5HWoUozdW1xLh_6rb8lB1N=w960-h1280-no"
        className={classes.avatar}
      />
    </Grid>
    <Grid item xs={12} sm={8} className={classes.textContainer}>
      <ReactMarkdown className={classes.text} source={markdowText} />
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(ProfileBanner);
