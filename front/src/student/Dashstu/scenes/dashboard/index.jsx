import React, { useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import debounce from "lodash/debounce";
import { FaTasks } from "react-icons/fa"; // Import Font Awesome icons
import { IoIosPaper } from "react-icons/io"; // Import Ionicons
import { MdMailOutline } from "react-icons/md"; // Import the desired icon for messages

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleResize = debounce(() => {
    // Handle resize event here
  }, 100);

  useEffect(() => {
    const observer = new ResizeObserver(handleResize);
    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* <Box m="10px">
         <Header title="لوحة التحكم"/>
 
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
      <Box gridColumn="span 3" className={classes.statBox}>
      <StatBox
        title="12,361"
        subtitle="نسبة واجبات تم تسليمها"
        progress={0.75}
        icon={<IoIosPaper size={30} />}
      />
    </Box>
    <Box gridColumn="span 3" className={classes.statBox}>
      <StatBox
        title="431,225"
        subtitle="نسبة امتحانات تم انجازها"
        progress={0.5}
        icon={<IoIosPaper size={30} />}
      />
    </Box>
  
    <Box gridColumn="span 3" className={classes.statBox}>
    <StatBox
      title="32,441"
      subtitle="رسائل لم يتم الرد عليها"
      progress={0.3}
      icon={<MdMailOutline size={30} />} // Using the mail icon
    />
      </Box>
    <Box gridColumn="span 3" className={classes.statBox}>
      <StatBox
        title="1,325,134"
        subtitle="مهام لم يتم انجازها"
        progress={0.8}
        icon={<FaTasks size={30} />}
      />
    </Box>



        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
              الامتحان وعلامته
              </Typography>
              
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              العمليات الأخيرة
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}$
              </Box>
            </Box>
          ))}
        </Box>
    
      </Box>
    </Box> */}
    </div>
  );
};

export default Dashboard;
