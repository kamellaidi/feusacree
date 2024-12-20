import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addDates, setDays } from '../../actions/calendar';

const { RangePicker } = DatePicker;

const DateRangePicker = () => {

  const dispatch = useDispatch();

  // les dates sélectionnés sont récupérés dans le state
  const { dates } = useSelector((state) => state.datesReducer);
  // pour le nombre de jours de location qui sera utilisé pour le prix final
  const { days } = useSelector((state) => state.datesReducer);

  // fonction qui retourne le nombre de jours de location
  // et les dates puis les range ça dans le state

  const handleChangeDates = async (values) => {

    localStorage.removeItem('days');
    localStorage.removeItem('dates');

    const modifyDates = values.map((item) => {
      return moment(item).format('YYYY-MM-DD');
    });

    // on envoie dans le reducer calendar pour etre dispo partout

    dispatch(addDates(modifyDates));

    localStorage.setItem('dates', modifyDates);

    if (modifyDates) {
    // methode de calcul pour le nombre de jours de location
      const dateOne = new Date(modifyDates[0]);
      const dateTwo = new Date(modifyDates[1]);
      const DifferenceInTime = dateTwo.getTime() - dateOne.getTime();
      const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
      

      // c'est envoyé dans le reducer calendar et dans le localStorage

      localStorage.setItem('days', JSON.stringify(DifferenceInDays));

      dispatch(setDays(DifferenceInDays));

      // on multipliera le prix d'un item par le nombre de jours
    }
    else {
      console.log('ça marche pas');
    }
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  return (

    <div>
      <RangePicker
        onChange={(values) => handleChangeDates(values)}
        disabledDate={disabledDate}
      />
    </div>
  );
};

export default DateRangePicker;