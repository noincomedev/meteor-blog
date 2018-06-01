import React from "react";

import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  gridList: {
    width: "100%",
    minHeight: "25vh"
  }
});

const StackPage = ({ classes }) => (
  <Grid container direction="column" alignItems="center">
    <GridList cellHeight={180} className={classes.gridList} cols={8}>
      <GridListTile cols={2}>
        <img
          src="https://pbs.twimg.com/profile_images/496317028408365060/sSwMqqsH_400x400.png"
          alt="Namecheap"
        />
      </GridListTile>
      <GridListTile cols={3}>
        <img
          src="https://longren.io/wp-content/uploads/2014/02/do-crushed.png"
          alt="Digital Ocean"
        />
      </GridListTile>
      <GridListTile cols={3}>
        <img
          src="https://tr2.cbsistatic.com/hub/i/r/2016/08/09/e450825d-6592-49cd-a2a8-e172ef086841/resize/770x/d43e6e8ffe1465f20fe473f7d58cc896/ubuntuhero.jpg"
          alt="Ubuntu"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img
          src="https://tr3.cbsistatic.com/hub/i/r/2016/07/14/9b8f5520-b483-4159-8cee-c036485574e7/resize/770x/76f6684ad79e06c14ac4c99bbcc7485e/nginxhero.jpg"
          alt="NGinx"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img
          src="https://www.cloudflare.com/img/cf-facebook-card.png"
          alt="Cloudflare"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img
          src="https://avatars0.githubusercontent.com/u/9919?s=280&v=4"
          alt="Github"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img
          src="https://i1.wp.com/blog.docker.com/wp-content/uploads/2013/06/Docker-logo-011.png?ssl=1"
          alt="Docker"
        />
      </GridListTile>
      <GridListTile cols={4}>
        <img
          src="https://d14jjfgstdxsoz.cloudfront.net/assets/og-image-logo.png"
          alt="MeteorJS"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img
          src="https://redash.io/assets/images/integrations/mongodb.png"
          alt="MongoDB"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img
          src="https://pbs.twimg.com/profile_images/704360169245794304/XOtbhFOC.jpg"
          alt="MLab"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img
          src="https://avatars3.githubusercontent.com/u/17189275?s=280&v=4"
          alt="Apollo"
        />
      </GridListTile>
      <GridListTile cols={4}>
        <img
          src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png"
          alt="ReactJS"
        />
      </GridListTile>
      <GridListTile cols={2}>
        <img src="https://material-ui.com/static/brand.png" alt="Material-ui" />
      </GridListTile>
    </GridList>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(StackPage);
