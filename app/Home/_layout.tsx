import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEDEB',
    alignItems: 'center',
    // paddingTop: 50,
  },
  iconContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  headerMonth: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    width: 100,
    fontSize: 18,
    marginHorizontal: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  arrowLeft: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 60,
  },
  arrowRight: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 60,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  filterRow: {
    width: '90%',
    paddingVertical: 8,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  filterButton: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginHorizontal: 5,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: '#fff',
  },
  totalText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 8,
    fontWeight: 'bold',
  },
  totalSubText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    color: '#888',
  },
  chartContainer: {
    width,
    alignItems: 'center',
    paddingVertical: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
    backgroundColor: '#AAA',
  },
  indicatorActive: {
    backgroundColor: '#333',
  },
  totalGasto: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#454F2C',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    zIndex: 10,
  },
  menuSide: {
    flexDirection: 'row',
    gap: 25,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  menuText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 36,
    color: '#454F2C',
    fontWeight: 'bold',
    marginTop: -7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalBox: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 12,
    elevation: 5,
    alignItems: 'center',
    zIndex: 2,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  modalValue: {
    fontSize: 18,
    color: '#444',
  },
});
