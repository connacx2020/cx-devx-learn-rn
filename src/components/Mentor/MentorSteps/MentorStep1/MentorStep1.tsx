import React from 'react';
import { View, Text,TouchableOpacity,ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import StarRating from 'react-native-star-rating';
import { useFocusEffect } from '@react-navigation/native';


import { MentorTopTabNavProps } from '../../../../common/ultis/ParamLists/MentorParamList';
import { saveMentorStep } from '../../../../common/redux/redux-actions';
import { store } from "../../../../common/redux";
import { styles } from './styles';
import { Button  } from 'react-native-paper';

function CxDevxMentorStep1({ navigation,route }: MentorTopTabNavProps<"MentorStep1">) {
    const { colors } = useTheme();
    const [selectedStudyValue,setSelectStudyValue] = React.useState<any>('');
    const [selectedWorkValue,setSelectWorkValue] = React.useState<any>('');
    const [isModalVisible,setModalVisible] = React.useState<any>(false);
    const [selectedStar,setSelectStar] = React.useState<any>(0);
    const [skillName,setSkillName] = React.useState<String>('');
    let initailSkill: any = [
    ];
    let [skillData,setSkillData] = React.useState<any>(initailSkill);

      useFocusEffect(() => {
            store.dispatch(saveMentorStep(route.name));
      })

    let studyData = [
      {
        label: 'Computer Science',
        value: 'Computer Science',
      }, {
        label: 'Technology',
        value: 'Technology',
      }, {
        label: 'Business',
        value: 'Business',
      },{
          label: 'Architecture',
          value: 'Architecture'
      },{
          label: 'Linguistics',
          value: 'Linguistics'
      },
      {
          label: 'Other',
          value: 'Other'
      }
    ];
    let workData = [
        {
          label: 'Software Engineer',
          value: 'Software Engineer',
        }, {
          label: 'Web Developer',
          value: 'Web Developer',
        }, {
          label: 'Accountant',
          value: 'Accountant',
        },
        {
            label: 'Full Stack Developer',
            value: 'Full Stack Developer'
        },
        {
            label: 'DataScience',
            value: 'DataScience'
        }
      ];


      const addSkillHandler = () =>{
        let temp = {"skill_name": skillName , "rating_star":selectedStar };
        console.log(skillData);
        skillData.push(temp);
        setSkillData(skillData);

        ToastAndroid.show(skillName+" have added in your skill!", ToastAndroid.SHORT);
        setSkillName('');
        setSelectStar(0);
        setModalVisible(false);
        console.log(skillData);
      }

      const deleteSkillHander = (skill_name : string) =>{
        let result = skillData.filter( (item:any) => {
          return item.skill_name !== skill_name
        });
        skillData = result;
        setSkillData(skillData)
        ToastAndroid.show(skill_name+" have deleted in your skill!", ToastAndroid.SHORT);
      }

      const _renderSkillItems = (skill : any) =>{
        return(
          <View style={styles.render_skill_item_field}>
              <Text style={styles.skill_name_txt}>{skill.skill_name}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={skill.rating_star}
                      starSize={20}
                      starStyle={{color: "#FFD700"}}
                  />
                  <Text style={styles.skill_name_txt}>{skill.rating_star}</Text>
                  <TouchableOpacity style={styles.delete_icon_field}
                    onPress={()=>deleteSkillHander(skill.skill_name)}
                  >
                      <MCIcon name={"delete"} size={20} color={"tomato"} />
                  </TouchableOpacity>
                </View>
          </View>
        )
      }

    return (
        <View style={styles.wrapper}>
          <View style={{zIndex:1,elevation:3}}>
              <View style={styles.row}>

                  <View style={styles.type_name_row}>
                      <Text style={styles.label_txt}>Studying &nbsp;&nbsp;:</Text>
                  </View>

                  <View style={styles.type_value_row}>
                  <DropDownPicker
                                zIndex={2000}
                                items={studyData}
                                placeholder="What are you study on?"
                                defaultIndex={0}
                                containerStyle={{height:35}}
                                onChangeItem={(item:any) => setSelectStudyValue(item.value)}
                            />
                  </View>

              </View>

              <View style={styles.row}>

                  <View style={styles.type_name_row}>
                      <Text style={styles.label_txt}>Working as :</Text>
                  </View>

                  <View style={styles.type_value_row}>
                  <DropDownPicker
                                zIndex={1000}
                                items={workData}
                                placeholder="What are you work as?"
                                defaultIndex={0}
                                containerStyle={{height:35}}
                                onChangeItem={(item:any) => setSelectWorkValue(item.value)}
                    />
                  </View>

              </View>
            </View>



            <View style={styles.skill_field}>
              <View style={styles.skill_render_items_field}>
                <Text style={styles.my_skill_txt}>My Skill</Text>
                {
                  skillData.map((skillItem:any) =>_renderSkillItems(skillItem))
                }

              </View>



            </View>

            <TouchableOpacity style={{position:'absolute',bottom:0,alignSelf:'flex-end'}}
                onPress={()=>setModalVisible(true)}
              >
                <MCIcon name={"plus-circle"} size={40} color={"#2541B2"} />
            </TouchableOpacity>

            <Modal
                  style={{justifyContent:'center',alignItems:'center'}}
                  isVisible={isModalVisible}
                  onBackButtonPress={() => setModalVisible(false)}>
                    <View style={{width:280,height:240,backgroundColor:'white',borderRadius:10}}>
                      <View style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:16,fontWeight:'800'}}>Select skill what you have learn</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'center',marginVertical:10,padding:5}}>
                        <View style={{marginRight:20,marginTop:5}}>
                          <Text style={{fontSize:15}}>Skill :</Text>
                        </View>
                        <View style={{width:150}}>
                          <DropDownPicker
                           zIndex={1}
                              items={[
                                  {label: 'Nodejs', value: 'Nodejs'},
                                  {label: 'Graphql', value: 'Graphql'},
                                  {label: 'Reactjs', value: 'Reactjs'},
                                  {label: 'React Native', value: 'React Native'},
                                  {label: 'Nestjs', value: 'Nestjs'},
                                  {label: 'MySQL', value: 'MySQL'},
                              ]}
                              placeholder="Select a skill"
                              defaultIndex={0}
                              containerStyle={{height:35}}
                              onChangeItem={(item:any) =>setSkillName(item.value)}
                          />
                        </View>
                      </View>

                      <View style={{flexDirection:'row',justifyContent:'center',marginVertical:10,padding:5}}>
                        <View style={{marginRight:10}}>
                          <Text style={{fontSize:15}}>Rate your skill :</Text>
                        </View>
                        <View style={{width:100}}>
                              <StarRating
                                  disabled={false}
                                  maxStars={5}
                                  rating={selectedStar}
                                  starSize={20}
                                  starStyle={{color: "#FFD700"}}
                                  selectedStar={(value)=>setSelectStar(value)}
                              />
                        </View>
                      </View>

                      <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',height:50,marginTop:20,zIndex:-1}}>
                          <Button mode="outlined"  labelStyle={{color:'#333',fontWeight:'500',fontSize:12}} onPress={() => setModalVisible(false)}>
                            Cancel
                          </Button>
                          <Button mode="contained" color="#12ffd3"labelStyle={{fontWeight:'500',fontSize:12}} onPress={addSkillHandler}>
                            Submit
                          </Button>
                      </View>

                    </View>

              </Modal>

        </View>
    )
}



export default CxDevxMentorStep1;
