import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 10,
    marginBottom: 10,
  },

  storageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },

  pathCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },

  topButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  upButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 10,
  },

  folderButton: {
    backgroundColor: '#10B981',
    padding: 10,
    borderRadius: 10,
  },

  fileButton: {
    backgroundColor: '#F59E0B',
    padding: 10,
    borderRadius: 10,
  },

  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },

  itemMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemIcon: {
    fontSize: 26,
    marginRight: 10,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },

  itemMeta: {
    fontSize: 13,
    color: '#64748B',
  },

  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 8,
  },

  infoButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  smallButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  confirmBtn: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  editorContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F6FB',
  },

  editorInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
});