import { ControlItemDisplay, DesignControlType } from './types';
import uuid from './uuid';

const controlSettingsRegistry: ControlItemDisplay[] = [];

const registerControlSettings = (definition: ControlItemDisplay) => controlSettingsRegistry.push(definition);

const getNewLabelSettings = () => ({
  id: uuid("label_settings_uuid_"),
  type: DesignControlType.LABEL,
  icon: "Label",
  title: "Label for fields",
  subtitle: "This component makes easy to design forms which contains addresses"
});

const getNewAddressSettings = () => ({
  id: uuid("address_settings_uuid_"),
  type: DesignControlType.ENTRY_FIELD,
  icon: "Address",
  title: "Address fields",
  subtitle: "This component makes easy to design forms which contains addresses"
});

registerControlSettings(getNewLabelSettings());
registerControlSettings(getNewAddressSettings());

export const getControlSettings = (): ControlItemDisplay[] => controlSettingsRegistry;
